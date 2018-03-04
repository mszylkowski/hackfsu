import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ClassesComponent } from './../classes/classes.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
  classCode: string;
  currClass: any;
  state = 'loading';
  currNote = '';
  notes: any[];
  typePrediction = '';
  writing = [];
  filter = 'all';
  helpShowing = true;

  constructor(public route: ActivatedRoute, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    route.paramMap.subscribe((e) => {
      this.classCode = e.get('id').toUpperCase();
      db.object('classes/' + this.classCode).valueChanges().subscribe((f) => {
        this.currClass = f;
        if (f) {
          this.state = 'found';
        } else {
          this.state = 'not found';
        }
      });
      db.object('notes/' + this.classCode).valueChanges().subscribe(notes => {
        this.notes = [];
        if (!notes) {
          return;
        }
        for (const note of Object.keys(notes)) {
          const starred = notes[note].starred && notes[note].starred[this.afAuth.auth.currentUser.uid];
          this.notes.push({key: note, value: notes[note], starred: starred});
        }
      });
      db.list('writing/' + this.classCode).valueChanges().subscribe(writing => {
        if (writing) {
          this.writing = writing.filter((write: any) => write.content !== this.currNote && write.time - new Date().getTime() < 60000);
        } else {
          this.writing = [];
        }
      });
    });
  }

  ngOnInit() {
  }

  sendNote() {
    this.currNote = this.currNote.trim();
    if (this.currNote.length === 0) {
      return;
    }
    let type = 'p';
    if (this.currNote.startsWith('###')) {
      type = 'h3';
      this.currNote = this.currNote.substr(3);
    } else if (this.currNote.startsWith('##')) {
      type = 'h2';
      this.currNote = this.currNote.substr(2);
    } else if (this.currNote.startsWith('#')) {
      type = 'h1';
      this.currNote = this.currNote.substr(1);
    } else if (this.currNote.startsWith('---')) {
      type = 'l3';
      this.currNote = this.currNote.substr(3);
    } else if (this.currNote.startsWith('--')) {
      type = 'l2';
      this.currNote = this.currNote.substr(2);
    } else if (this.currNote.startsWith('-')) {
      type = 'l1';
      this.currNote = this.currNote.substr(1);
    } else if (this.currNote.startsWith('!')) {
      type = 'img';
      this.currNote = this.currNote.substr(1);
    }
    const starred = {};
    starred[this.afAuth.auth.currentUser.uid] = 'hey';
    this.db.database.ref('notes/' + this.classCode).push({
      content: this.currNote,
      type: type,
      starred: starred,
      time: new Date().getTime(),
      userID: this.afAuth.auth.currentUser.uid
    });
    this.db.database.ref('writing/' + this.classCode + '/' + this.afAuth.auth.currentUser.uid).set(null);
    this.currNote = '';
  }

  predictType() {
    if (this.currNote.startsWith('###')) {
      this.typePrediction = 'h3';
    } else if (this.currNote.startsWith('##')) {
      this.typePrediction = 'h2';
    } else if (this.currNote.startsWith('#')) {
      this.typePrediction = 'h1';
    } else if (this.currNote.startsWith('---')) {
      this.typePrediction = 'l3';
    } else if (this.currNote.startsWith('--')) {
      this.typePrediction = 'l2';
    } else if (this.currNote.startsWith('-')) {
      this.typePrediction = 'l1';
    } else if (this.currNote.startsWith('!')) {
      this.typePrediction = 'img';
    } else {
      this.typePrediction = 'p';
    }
    if (this.currNote.length < 1) {
      this.db.database.ref('writing/' + this.classCode + '/' + this.afAuth.auth.currentUser.uid).set(null);
    } else {
      this.db.database.ref('writing/' + this.classCode + '/' + this.afAuth.auth.currentUser.uid).update({
        content: this.currNote,
        time: new Date().getTime()
      });
    }
  }

  star(note) {
    if (note.starred) {
      this.db.database.ref('notes/' + this.classCode + '/' + note.key + '/starred/' + this.afAuth.auth.currentUser.uid).set(null);
    } else {
      this.db.database.ref('notes/' + this.classCode + '/' + note.key + '/starred/' + this.afAuth.auth.currentUser.uid).set('HI');
    }
  }

  ngOnDestroy() {
    this.db.database.ref('writing/' + this.classCode + '/' + this.afAuth.auth.currentUser.uid).set(null);
  }

  showHelp() {
    this.helpShowing = !this.helpShowing;
  }
}

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ClassesComponent } from './../classes/classes.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  classCode: string;
  currClass: any;
  state = 'loading';
  currNote = '';
  notes: any[];

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
        for (const note of Object.keys(notes)) {
          const starred = notes[note].starred && notes[note].starred[this.afAuth.auth.currentUser.uid];
          this.notes.push({key: note, value: notes[note], starred: starred});
        }
      });
    });
  }

  ngOnInit() {
  }

  sendNote() {
    this.currNote = this.currNote.trim();
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
    } else if (this.currNote.startsWith('.') || this.currNote.startsWith('-')) {
      type = 'li';
      this.currNote = this.currNote.substr(1);
    }
    this.db.database.ref('notes/' + this.classCode).push({
      content: this.currNote,
      type: type
    });
    this.currNote = '';
  }

  star(note) {
    if (note.starred) {
      this.db.database.ref('notes/' + this.classCode + '/' + note.key + '/starred/' + this.afAuth.auth.currentUser.uid).set(null);
    } else {
      this.db.database.ref('notes/' + this.classCode + '/' + note.key + '/starred/' + this.afAuth.auth.currentUser.uid).set('HI');
    }
  }
}

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
  titles: any[];

  constructor(public route: ActivatedRoute, private db: AngularFireDatabase) {
    route.paramMap.subscribe((e) => {
      this.classCode = e.get('id').toUpperCase();
      db.object('classes/' + this.classCode).valueChanges().subscribe((f) => {
        this.currClass = f;
        console.log(f);
        if (f) {
          this.state = 'found';
        } else {
          this.state = 'not found';
        }
      });
      db.list('notes/' + this.classCode + '/titles').valueChanges().subscribe(titles => {
        this.titles = titles;
      });
    });
  }

  ngOnInit() {
  }

}

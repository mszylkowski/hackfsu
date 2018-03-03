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

  constructor(public route: ActivatedRoute, private db: AngularFireDatabase) {
    route.paramMap.subscribe((e) => {
      this.classCode = e.get('id');
      db.object('notes/' + this.classCode.toLowerCase()).valueChanges().subscribe((f) => {
        this.currClass = f;
        console.log(f);
        if (f) {
          this.state = 'found';
        } else {
          this.state = 'not found';
        }
      });
    });
  }

  ngOnInit() {
  }

}

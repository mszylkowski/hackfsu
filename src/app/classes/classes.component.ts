import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: any[] = [];

  constructor(private db: AngularFireDatabase) {
    db.list('classes').valueChanges().subscribe((e) => {
      this.classes = e;
    });
  }

  ngOnInit() {
  }

}

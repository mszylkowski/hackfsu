import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  class: any = {
    university: '',
    code: '',
    name: '',
    professor: '',
    time: '',
    section: '',
    semester: ''
  };

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {
  }

  addClass() {
    this.db.database.ref('classes/' + this.class.code).set(this.class);
  }

}


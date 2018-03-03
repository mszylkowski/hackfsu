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
    semester: ''
  };
  error = '';

  universities = ['Georgia Institute of Technology', 'Florida State University', 'University of Georgia', 'University of Florida',
  'Stanford', 'Harvard'];

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {
  }

  resetError() {
    this.error = '';
  }

  addClass() {
    this.db.object('classes/' + this.class.code).valueChanges().subscribe(e => {
      if (e) {
        this.error = 'There already exists a class with that code';
        return;
      }
      this.db.database.ref('classes/' + this.class.code).set(this.class);
    });
  }

  upperCaseCode() {
    this.class.code = this.class.code.toUpperCase();
    console.log(this.class.code);
  }

}


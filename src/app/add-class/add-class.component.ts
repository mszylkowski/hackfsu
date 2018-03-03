import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

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

  universities = ['Auburn University', 'Boston College', 'Georgia Institute of Technology', 'Florida Atlantic University'
  , 'Florida State University', 'Harvard University', 'Kennesaw State University',
  'Massachusetts Institute of Technology', 'Stanford University', 'Temple University', 'Rice University'
   ];

  constructor(private db: AngularFireDatabase, private router: Router) {
  }

  ngOnInit() {
  }

  resetError() {
    this.error = '';
  }

  addClass() {
    this.upperCaseCode();
    if (this.class.code.length < 6 || this.class.code.length > 8) {
      this.error = 'The Class Code is not valid';
      return;
    } else if (this.class.professor.length < 5) {
      this.error = 'The Professor is not valid';
      return;
    } else if (this.class.time.length < 12) {
      this.error = 'The time is not valid';
      return;
    }
    this.db.object('classes/' + this.class.code).valueChanges().subscribe(e => {
      if (e) {
        this.error = 'There already exists a class with that code';
        return;
      }
      this.db.database.ref('classes/' + this.class.code).set(this.class);
      this.db.database.ref('notes/' + this.class.code + '/titles').push({content: 'Course Information'});
      this.router.navigate(['classes', this.class.code]);
    });
  }

  upperCaseCode() {
    this.class.code = this.class.code.toUpperCase();
  }

}


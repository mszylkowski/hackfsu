import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: any[] = [];
  filteredClasses: any[];
  filter = '';

  constructor(private db: AngularFireDatabase, private router: Router) {
    db.list('classes').valueChanges().subscribe((e) => {
      this.classes = e;
      this.filterClasses();
    });
  }

  ngOnInit() {
  }

  filterClasses() {
    this.filteredClasses = this.classes.filter(currClass => {
      if (currClass.code.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      } else if (currClass.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }

  filterChange() {
    this.filterClasses();
  }

  goToClass() {
    if (this.filteredClasses.length === 1) {
      this.router.navigate(['classes', this.filteredClasses[0].code]);
    }
  }
}

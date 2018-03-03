import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: any[] = [
    {
      code: 'CS2340',
      name: 'Objects and Design',
      professor: 'Bob Waters',
      semester: 'Spring 2018',
      section: 'B',
      time: ['MWF 14:00-15:00']
    },
    {
      code: 'CS1332',
      name: 'Data Structures and Algorithms',
      professor: 'Marry Hudachek',
      semester: 'Spring 2018',
      section: 'A',
      time: ['MWF 9:00-10:00']
    },
    {
      code: 'CS1332',
      name: 'Data Structures and Algorithms',
      professor: 'Marry Hudachek',
      semester: 'Spring 2018',
      section: 'A',
      time: ['MWF 9:00-10:00']
    },
    {
      code: 'CS1332',
      name: 'Data Structures and Algorithms',
      professor: 'Marry Hudachek',
      semester: 'Spring 2018',
      section: 'A',
      time: ['MWF 9:00-10:00']
    },
    {
      code: 'CS1332',
      name: 'Data Structures and Algorithms',
      professor: 'Marry Hudachek',
      semester: 'Spring 2018',
      section: 'A',
      time: ['MWF 9:00-10:00']
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

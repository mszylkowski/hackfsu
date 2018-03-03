import { ClassesComponent } from './../classes/classes.component';
import { Routes, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  classCode: string;

  constructor(public route: ActivatedRoute) {
    route.paramMap.subscribe((e) => {
      this.classCode = e.get('id');
    });
  }

  ngOnInit() {
  }

}

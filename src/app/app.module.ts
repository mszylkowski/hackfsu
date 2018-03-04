import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule, Routes, RouterLink } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ClassesComponent } from './classes/classes.component';
import { NotesComponent } from './notes/notes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddClassComponent } from './add-class/add-class.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
  { path: 'classes', component: ClassesComponent },
  { path: 'classes/addPage', component: AddClassComponent },
  { path: 'classes/:id',      component: NotesComponent },
  { path: '',
    redirectTo: '/classes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ClassesComponent,
    NotesComponent,
    PageNotFoundComponent,
    NavbarComponent,
    AddClassComponent,
    ChatComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

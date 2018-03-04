import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() currClass: any;
  closed = false;
  conversation = [];
  chatInput = '';
  name = '';

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.name = user.displayName;
      }
    });
  }

  ngOnInit() {
    this.db.list('chats/' + this.currClass.code).valueChanges().subscribe((e: any[]) => {
      if (e) {
        this.conversation = e;
      } else {
        this.conversation = [];
      }
    });
  }

  toggleChat() {
    this.closed = !this.closed;
  }

  sendChat() {
    this.db.database.ref('chats/' + this.currClass.code).push({
      name: this.afAuth.auth.currentUser.displayName,
      time: new Date().getTime(),
      content: this.chatInput
    });
    this.chatInput = '';
  }
}

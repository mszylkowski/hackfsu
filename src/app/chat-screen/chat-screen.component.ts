import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  classCode: string;
  closed = false;
  conversation = [];
  chatInput = '';
  name = '';
  currClass: any;
  classes = ['CS2050', 'CS4660', 'MATH1554', 'EAS1600', 'PUBP3214'];
  messagesMap = {};

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.name = user.displayName;
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((map: any) => {
      console.log(map.params);
      if (map.params['id']) {
        this.classCode = map.params['id'];
        this.db.object('classes/' + this.classCode).valueChanges().subscribe(aClass => {
          if (aClass) {
            this.currClass = aClass;
            this.db.list('chats/' + this.classCode).valueChanges().subscribe((chats: any[]) => {
              if (chats) {
                this.conversation = chats;
              } else {
                this.conversation = [];
              }
            });
          } else {
            this.router.navigate(['not-found']);
          }
        });
      } else {
        this.router.navigate(['not-found']);
      }
    });

    this.connectChats();
  }

  toggleChat() {
    this.closed = !this.closed;
  }

  connectChats() {
    for (const course of this.classes) {
      this.db.list('chats/' + course, ref => ref.limitToLast(1)).valueChanges().subscribe(e => {
        this.messagesMap[course] = e;
        console.log(this.messagesMap);
      });
    }
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

import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import {User} from '../user/user';
import {AuthService} from '../auth/auth.service';
import {UsersService} from '../user/service/users.service';
import {Message} from '../chat-box/message-model';
import {Subject} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

declare var $: any;
declare var Swal: any;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  currentUser: User;
  messageSubject = new Subject<any>();

  constructor(private authService: AuthService,
              private userService: UsersService,
              ) {
    this.getCurrentUser();
  }

  connectToChat(currentUser, message) {
    let ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe('/topic/chats', (messageOutput) => {
        let data = JSON.parse(messageOutput.body);
        this.getCurrentUser();
          if (this.currentUser.userId == data.receiver.userId) {
            //do something
            this.messageSubject.next(data);
          }
      });
    });
  };

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  sendMessage(chat) {
    this.stompClient.send('/app/chats', {}, JSON.stringify(chat));
  }


  getCurrentUser(){
    let userId = this.authService.getUserId();
    this.userService.getUserById(userId).subscribe(
      data => this.currentUser = data,
      error => console.log(error.message)
    )
  }

  drawNewChatMessage(messageOutput: Message, receiver) {
    console.log(messageOutput);
  }
}

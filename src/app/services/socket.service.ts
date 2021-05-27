import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import {User} from '../user/user';
import {AuthService} from '../auth/auth.service';
import {UsersService} from '../user/service/users.service';
import {LocalStorageService} from 'ngx-webstorage';

const API_URL = `${environment.apiUrl}`;

declare var $: any;
declare var Swal: any;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  currentUser: User;

  constructor(private authService: AuthService,
              private userService: UsersService,
              private localStorage: LocalStorageService
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
          if (this.currentUser.userId == data.receiver.id) {
            this.drawNewChatMessage(data, this.currentUser);
            setTimeout(() => {
              message.nativeElement.scrollTop = message.nativeElement.scrollHeight;
            }, 1);
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

  drawNewChatMessage(messageOutput, currentUser) {
    console.log(messageOutput);
    console.log(currentUser);
    // let ul = document.getElementById('history');
    // let firstLi = $('ul#history li:first').get(0);
    // let li = firstLi.cloneNode(true);
    // li.innerHTML = messageOutput.content;
    // let className = currentUser.id == messageOutput.sender.id ? 'me' : 'you';
    // li.setAttribute('class', className);
    // ul.appendChild(li);
  }
}

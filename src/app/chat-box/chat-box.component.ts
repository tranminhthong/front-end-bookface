import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from './message-model';
import {User} from '../user/user';
import {SocketService} from '../services/socket.service';
import {AuthService} from '../auth/auth.service';
import {UsersService} from '../user/service/users.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnDestroy {

  public message: ElementRef<any>;
  @Input() receiver: User;
  content = '';
  currentUser: User = {}
  listMessage: Message[] = []
  size = 10;
  constructor(private socketService: SocketService,
              private authService: AuthService,
              private userService: UsersService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  async sentMessage(user: User) {
    let message: Message = {
      content: this.content,
      sender: {
        id: this.currentUser.userId
      },
      receiver: {
        id: user.userId
      }
    }
    this.socketService.sendMessage(message);
    this.content = '';
    this.socketService.drawNewChatMessage(message, user);
  }


  getCurrentUser(){
    let userId = this.authService.getUserId();
    this.userService.getUserById(userId).subscribe(
      data => this.currentUser = data,
      error => console.log(error.message)
    )
  }

}

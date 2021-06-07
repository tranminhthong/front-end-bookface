import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Message} from './message-model';
import {User} from '../user/user';
import {SocketService} from '../services/socket.service';
import {AuthService} from '../auth/auth.service';
import {UsersService} from '../user/service/users.service';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('message', {static: false, read: ElementRef}) public message: ElementRef<any>;
  @Input() receiver: User = {};
  content = '';
  @Input() currentUser: User = {}
  listMessage: Message[] = []
  size = 10;
  constructor(private socketService: SocketService,
              private authService: AuthService,
              private userService: UsersService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.getCurrentUser();
    if(this.currentUser){
      this.socketService.connectToChat(this.currentUser, this.message)
    }
    this.socketService.messageSubject.subscribe(
      data => {
        this.listMessage.push(data);
        this.scrollBottom();
      }
    )
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['receiver']) {
      this.getListMessage();
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  async sentMessage(user: User) {
    let message: Message = {
      content: this.content,
      sender: {
        userId: this.currentUser.userId
      },
      receiver: {
        userId: user.userId
      }
    }
    this.socketService.sendMessage(message);
    this.content = '';
    // this.socketService.drawNewChatMessage(message, user);
    this.listMessage.push(message);
    this.scrollBottom();
  }


  getCurrentUser(){
    let userId = this.authService.getUserId();
    this.userService.getUserById(userId).subscribe(
      data => this.currentUser = data,
      error => console.log(error.message)
    )
  }

  getListMessage(){
   this.chatService.getAllChat(this.currentUser.userId, this.receiver.userId, this.size).subscribe(
     (data) => {
       this.listMessage = data;
       console.log(this.listMessage);
       this.scrollBottom();
     },
    (error) => console.log(error.message)
   );
  }

  scrollBottom() {
    setTimeout(() => {
      this.message.nativeElement.scrollTop = this.message.nativeElement.scrollHeight;
    }, 1)
  }
}

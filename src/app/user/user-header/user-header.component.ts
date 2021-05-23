import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';
import {Friend} from '../Friend';
import {UsersService} from '../service/users.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Input() user: User = {};
  isMe = false;
  @Input() id = -1;
  friendShip: Friend;

  constructor(private localStorage: LocalStorageService,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      if (this.id === localStorage.retrieve('userId')) {
        this.isMe = true;
      } else {
        this.isMe = false;
      }
      this.getFriendByDoubleId(this.id);
    });
  }

  ngOnInit(): void {
  }

  getFriendByDoubleId(id: number) {
    let senderId = this.localStorage.retrieve('userId');
    let receiverId = id;
    this.userService.getFriendByDoubleId(senderId, receiverId).subscribe(value => {
      console.log(value);
      this.friendShip = value;
    });
  }

  addFriend() {
    this.friendShip = new Friend();
    this.friendShip = {
      sender: {
        userId: this.localStorage.retrieve('userId')
      },
      receiver: {
        userId: this.id
      },
      status: false
    };
    console.log(this.friendShip, 'friendship');

    this.userService.addFriendInFriendsUser(this.friendShip).subscribe(value => {
      this.friendShip = value;
    });
  }

  unFriend() {
    if (this.user.userId === this.friendShip.sender.userId) {

    }
    console.log(this.friendShip, 'frienship');
    this.userService.unFriend(this.friendShip.id).subscribe(value => {
      console.log(value, 'res');
      this.friendShip = value;
    });
  }

  accept() {
    this.userService.accept(this.friendShip).subscribe(value => {
      this.friendShip = value;
    });
  }
}

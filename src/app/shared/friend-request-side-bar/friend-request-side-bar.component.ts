import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Friend} from '../../user/Friend';
import {UsersService} from '../../user/service/users.service';
import {User} from '../../user/user';

@Component({
  selector: 'app-friend-request-side-bar',
  templateUrl: './friend-request-side-bar.component.html',
  styleUrls: ['./friend-request-side-bar.component.css']
})
export class FriendRequestSideBarComponent implements OnInit {
  @Input() friend: Friend;
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
  }

  unFriend() {
    this.userService.unFriend(this.friend.id).subscribe(value => {
      this.eventEmitter.emit()
    })
  }

  accept() {
    this.userService.accept(this.friend).subscribe(value => {
      this.eventEmitter.emit()
    })
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../service/users.service';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  listFriend: User[] = [];
  friendList: User[] = [];
  @Input() id = -1;
  user: User = {};
  currentUserId: number;
  title: string;

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute,
              private localStorage: LocalStorageService) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      this.currentUserId = this.localStorage.retrieve('userId');
      if (this.currentUserId === this.id){
        this.getAllFriend(this.id);
        this.title = 'Friends';
        this.getUser(this.currentUserId);
      }else {
        this.getAllMutualFriends(this.id, this.currentUserId);
        this.title = 'List Mutual Friends';
        this.getUser(this.id);
      }

    });
  }

  ngOnInit(): void {
  }

  getAllFriend(id: number) {
    this.userService.getAllFriend(id).subscribe(users => {
      this.listFriend = users;
      this.friendList = users;
    });
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
    });
  }

  getAllMutualFriends(id1: number, id2: number) {
    this.userService.getMutualFriends(id1, id2).subscribe(users => {
      this.listFriend = users;
      this.friendList = users;
    });
  }

  findFriend(key: string) {
    const friends = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.friendList.length; i++) {
      if (this.friendList[i].username.includes(key)) {
        friends.push(this.friendList[i]);
      }
    }
    this.listFriend = friends;
  }
}

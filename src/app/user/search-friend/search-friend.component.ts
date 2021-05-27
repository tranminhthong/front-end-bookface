import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../service/users.service';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {
  throttle = 0;
  distance = 2;
  key: string;
  page = 0;
  currentUserId: number;
  listUser: User[] = [];

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute,
              private localStorage: LocalStorageService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.key = params.get('key');
    });
    this.currentUserId = this.localStorage.retrieve('userId');
  }

  ngOnInit(): void {
    this.userService.searchUserByKey(this.key, this.page).subscribe(users => {
      this.listUser = users;
    });
  }

  onScroll(): void {
    this.userService.searchUserByKey(this.key, ++this.page).subscribe((users: User[]) => {
        this.listUser.push(...users);
      });
  }
}

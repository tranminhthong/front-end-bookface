import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../service/users.service';
import {User} from '../user';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
  }
}

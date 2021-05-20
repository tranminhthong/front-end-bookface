import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UsersService} from '../service/users.service';
import {ActivatedRoute} from '@angular/router';
import {parse} from '@angular/compiler/src/render3/view/style_parser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id = -1;
  user: User = {};
  listFriend: User[] = [];

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.getUser(this.id);
      this.getAllFriend(this.id);
    });
  }

  ngOnInit(): void {
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
    });
  }

  getAllFriend(id: number) {
    this.userService.getAllFriend(id).subscribe(users => {
      this.listFriend = users;
    });
  }
}

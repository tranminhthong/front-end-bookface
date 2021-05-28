import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../user/service/users.service';
import {User} from '../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  userId: number;
  role: string;
  user: User = {};

  //test chat
  users: User[] = []
  receiver: User = {}

  constructor(private authService: AuthService, private router: Router, private userService: UsersService) {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userId.subscribe((data: number) => this.userId = data);
    this.authService.userRole.subscribe((data: string) => this.role = data);
  }

  ngOnInit() {

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    this.role = this.authService.getRoleUser();
    this.getUser(this.username);
    //test chat
    this.userService.getAllFriend(this.userId).subscribe(
      data => {
        this.users = data;
        this.receiver = this.users[0];
      }

    )

  }

  goToUserProfile() {
    this.router.navigateByUrl('users/user-profile/' + this.userId);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

  getUser(uname: string) {
    this.authService.getUserByUserName(uname).subscribe(user => {
      this.user = user;
    });
  }

  search(key: string) {
    this.router.navigateByUrl('/users/search/' + key);
  }
}


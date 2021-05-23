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
  user: User = {};

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userId.subscribe((data: number) => this.userId = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    this.getUser(this.username);
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
}


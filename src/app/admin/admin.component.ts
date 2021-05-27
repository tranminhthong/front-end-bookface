import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../user/user';
import {UsersService} from '../user/service/users.service';
import {LocalStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  userActivated: User[];
  userBlocked: User[];
  stoMes: User[];
  users: User[];
  isAdmin: boolean;
  idAdmin: number;
  constructor(private userService: UsersService,
              private localStorage: LocalStorageService) {
    this.idAdmin = this.localStorage.retrieve('userId')
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  event() {
   this.getAllUsers()
  }

  eventBlock() {
    this.getAllUserBlocked()
  }

  getAllUserActivated() {
    return this.userService.getAllUserActivated().subscribe(value => {
      this.userActivated = value;
    });
  }


  getAllUsers(){
    return this.userService.getAllUsers().subscribe(value => {
      this.users = value;
    });
  }
  getAllUserBlocked() {
    return this.userService.getAllUserBlocked().subscribe(value => {
      this.userBlocked = value;
      console.log(this.userBlocked);
    });
  }

}

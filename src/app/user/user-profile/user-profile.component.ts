import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UsersService} from '../service/users.service';
import {ActivatedRoute} from '@angular/router';
import {parse} from '@angular/compiler/src/render3/view/style_parser';
import {Friend} from '../Friend';
import {LocalStorageService} from 'ngx-webstorage';
import {PostModel} from '../../post/post-model';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id = -1;
  user: User = {};
  listFriend: User[] = [];
  posts: PostModel[];
  isUser = false;

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute,
              private localStorage: LocalStorageService,
              private postService: PostService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.getUser(this.id);
      this.getAllFriend(this.id);
      this.getAllPostsById(this.id);
      this.checkUser();
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

  getAllPostsById(id: number) {
    this.postService.getAllPostsByUserId(id).subscribe(
      posts => this.posts = posts,
      error => console.log(error.message)
    );
  }

  checkUser() {
    if (this.localStorage.retrieve('userId')) {
      this.isUser = true;
    } else {
      this.isUser = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {PostModel} from '../post/post-model';
import {PostService} from '../services/post.service';
import {Friend} from '../user/Friend';
import {UsersService} from '../user/service/users.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  posts: PostModel[] = [];
  listFriends: Friend[];
  idReceiver: number = -1;
  constructor( private postService: PostService,
                private usersService: UsersService,
               private localStorage: LocalStorageService) {
    this.idReceiver = this.localStorage.retrieve('userId')
    this.getAllFriendsByReceiverUserId()
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(
      posts => this.posts = posts,
      error => console.log(error.message)
    )
  }

  addCreatedPost(createdPost: PostModel) {
    this.getAllPosts();
  }

  getAllFriendsByReceiverUserId() {
    this.usersService.getAllFriendsByIdReceiver(this.idReceiver).subscribe(value => {
      this.listFriends = value;
      console.log(this.listFriends);
    })
  }


}

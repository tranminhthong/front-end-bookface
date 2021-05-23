import { Component, OnInit } from '@angular/core';
import {PostModel} from '../post/post-model';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  posts: PostModel[] = [];

  constructor( private postService: PostService) {

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

}

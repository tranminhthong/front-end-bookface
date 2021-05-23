import {Component, Input, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import { Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable, throwError} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {Post} from '../../model/post';
import {PostPayload} from './post.payload';

import {UsersService} from '../../user/service/users.service';
import {AuthService} from '../../auth/auth.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {User} from '../../user/user';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public Editor = ClassicEditor;
  currentUser: User;
  createPostForm: FormGroup;
  postPayload: PostPayload;

  constructor(private router: Router,
              private postService: PostService,
              private userService: UsersService,
              private authService: AuthService,
              private route: Router) {
    this.postPayload = {
      description: '',
      privacy: 0,

    }
  }

  ngOnInit() {
    this.getCurrentUser();
    this.createPostForm = new FormGroup({
      privacy: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  createPost() {
    this.postPayload.privacy = + this.createPostForm.get('privacy').value;
    this.postPayload.description = this.createPostForm.get('description').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      console.log(data);
      this.createPostForm.reset();
      const closeBtn = document.getElementById('close-btn');
      closeBtn.click();

    }, error => {
      console.log(error.message)
    })
  }

  openCreatePostModal(){
    const container = document.getElementById('post-card');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#createPostModal');
    container.appendChild(button);
    button.click();
  }

  getCurrentUser(){
      let userId = this.authService.getUserId();
      this.userService.getUserById(userId).subscribe(
        data => this.currentUser = data,
        error => console.log(error.message)
      )
  }
}

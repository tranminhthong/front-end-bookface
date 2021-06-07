import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import { Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable, throwError} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {PostPayload} from './post.payload';

import {UsersService} from '../../user/service/users.service';
import {AuthService} from '../../auth/auth.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {User} from '../../user/user';
import {PostModel} from '../post-model';
import {UploadFileService} from '../../upload/upload-file.service';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  isLoggedIn: boolean;
  public Editor = ClassicEditor;
  currentUser: User;
  createPostForm: FormGroup;
  postPayload: PostPayload;
  postCreated: PostModel = {};
  imgUrl: string = '';

  constructor(private router: Router,
              private postService: PostService,
              private userService: UsersService,
              private authService: AuthService,
              private uploadService: UploadFileService,
              private route: Router) {

    this.postPayload = {
      description: '',
      privacy: 0,
    };
  }

  ngOnInit() {
    this.getCurrentUser();
    this.createPostForm = new FormGroup({
      privacy: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  @Output()
  createdPostEvent = new EventEmitter<PostModel>();

  onCreatePost(post: PostModel){
    console.log("Emit post create", post);
    this.createdPostEvent.emit(post);
  }

  createPost() {
    this.postPayload.privacy = + this.createPostForm.get('privacy').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    if(this.imgUrl !== ''){
      this.postPayload.description += `
    <div class="card-body d-block p-0 mb-3">
  <div class="row ps-2 pe-2">
    <div class="col-sm-12 p-1"><img src="${this.imgUrl}" style="width: 100%" class="rounded-3 w-100" alt="image"></div>
  </div>
</div>`;
    }
    this.postPayload.likeCount = 0;
    this.postPayload.heartCount = 0;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.postCreated = data;
      console.log(this.postCreated);
      this.onCreatePost(this.postCreated);
      this.createPostForm.reset();
      const closeBtn = document.getElementById('close-btn');
      closeBtn.click();
    }, error => {
      console.log(error.message);
    });
    this.imgUrl = '';
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
      );
  }

  async showPreviewAndSubmit(event) {
    this.uploadService.showPreview(event);
    this.imgUrl = await this.uploadService.submit();
  }
}

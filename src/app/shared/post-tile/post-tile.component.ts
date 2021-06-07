import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../post/post-model';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {User} from '../../user/user';
import {AuthService} from '../../auth/auth.service';
import {UsersService} from '../../user/service/users.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostPayload} from '../../post/create-post/post.payload';
import {validateConstructorDependencies} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';
import {UploadFileService} from '../../upload/upload-file.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  public Editor = ClassicEditor;

  @Input() posts: PostModel[] = [];

  currentUser: User;
  editPostForm: FormGroup = new FormGroup(
    {
      id: new FormControl(Validators.required),
      privacy: new FormControl(Validators.required),
      description: new FormControl(Validators.required),
      likeCount : new FormControl(Validators.required),
      heartCount : new FormControl(Validators.required),
    }
  );
  editPost: PostPayload = {};
  deletePost: PostModel;
  imgUrl: string = '';
  isUserProfile: boolean;
  id: number;

  constructor(private router: Router,
              private postService: PostService,
              private authService: AuthService,
              private userService: UsersService,
              private uploadService: UploadFileService,
              private activatedRoute: ActivatedRoute
              ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = + paramMap.get('id');
      if(this.id){
        this.isUserProfile = true;
      } else {
        this.isUserProfile = false;
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    if(this.isUserProfile){
      this.getAllPostByUserId();
    } else {
      this.getAllPost();
    }
  }

  goToPost(id: number): void {

  }

  getCurrentUser(){
    let userId = this.authService.getUserId();
    this.userService.getUserById(userId).subscribe(
      data => this.currentUser = data,
      error => console.log(error.message)
    )
  }

  openModal(mode: string, post: PostModel){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'edit'){
      this.editPostForm = new FormGroup({
        id: new FormControl(post.id, Validators.required),
        privacy: new FormControl(post.privacy, Validators.required),
        description: new FormControl(post.description, Validators.required),
        likeCount: new FormControl(post.likeCount, Validators.required),
        heartCount: new FormControl(post.heartCount, Validators.required),
      });
      button.setAttribute('data-bs-target', '#editPostModal');
    }
    if(mode === 'delete'){
      this.deletePost = post;
      button.setAttribute('data-bs-target', '#deletePostModal');
    }
    container.appendChild(button);
    button.click();
  }

  onEditPost(){
    this.editPost.postId = this.editPostForm.get('id').value;
    this.editPost.privacy = + this.editPostForm.get('privacy').value;
    this.editPost.description = this.editPostForm.get('description').value;
    // let test: string  =  this.editPost.description;
    // console.log(this.editPost.description);
    // test.replace('img', '<img class="rounded-3 w-100"')
    // console.log(test);
    if(this.imgUrl !== ''){
      this.editPost.description += `
    <div class="card-body d-block p-0 mb-3">
  <div class="row ps-2 pe-2">
    <div class="col-sm-12 p-1"><img src="${this.imgUrl}" style="width: 100%" class="rounded-3 w-100" alt="image"></div>
  </div>
</div>`;
    }
    this.editPost.likeCount = + this.editPostForm.get('likeCount').value;
    this.editPost.heartCount = + this.editPostForm.get('heartCount').value;
    console.log(this.editPost);
    this.postService.updatePost(this.editPost).subscribe(
      (data) => {
        if(this.isUserProfile){
          this.getAllPostByUserId();
        } else {
          this.getAllPost();
        }
      },
      (error) => {
        console.log(error.message);
      }
    )
    this.editPostForm.reset();
    this.imgUrl = '';
    const close = document.getElementById("close-post-edit-btn");
    close.click();
  }

  onDeletePost() {
      this.postService.deletePostById(this.deletePost.id).subscribe(
        () => {
          if(this.isUserProfile){
            this.getAllPostByUserId();
          } else {
            this.getAllPost();
          }
        document.getElementById("close-delete-button").click();
        },
        (e) => { console.log(e.message)}
      )
  }

  goToUserProfile(userId: number) {
    this.router.navigateByUrl('users/user-profile/' + userId);
  }

  async showPreviewAndSubmit(event) {
    this.uploadService.showPreview(event);
    this.imgUrl = await this.uploadService.submit();
  }

  getAllPost(){
    this.postService.getAllPosts().subscribe(
      data => this.posts = data,
      error => console.log(error.message)
    )
  }

  getAllPostByUserId(){
    this.postService.getAllPostsByUserId(this.id).subscribe(
      data => this.posts = data,
      error => console.log(error.message)
    )
  }
}

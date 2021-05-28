import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../user/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentModel} from "../../model/component/comment-model";
import {CommentService} from "../../services/comment.service";
import {AuthService} from "../../auth/auth.service";
import {UsersService} from "../../user/service/users.service";
import {PostModel} from "../../post/post-model";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  currentUser: User;
  commentModel: CommentModel = {};
  comments: CommentModel[] = [];
  addCommentForm: FormGroup = new FormGroup({
    text: new FormControl()
  });
  editCommentForm: FormGroup = new FormGroup({
    id: new FormControl(),
    text: new FormControl(),
    likeCount: new FormControl(),
    heartCount: new FormControl()
  });
  editComment: CommentModel = {};
  deletedComment: CommentModel = {};

  @Input() post: PostModel;

  constructor(private commentService: CommentService,
              private authService: AuthService,
              private userService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllCommentForPost();
  }

  createComment() {
    this.commentModel.text = this.addCommentForm.get('text').value;
    this.commentModel.postId = this.post.id;
    this.commentModel.userAvatar = this.post.userAvatar;
    this.commentService.createComment(this.commentModel).subscribe(
      data => {
        console.log('Created comment');
        this.getAllCommentForPost();
      },
      (e) => {
        console.log(e.message)
      }
    )
    this.addCommentForm.reset();
  }

  getCurrentUser() {
    const userId = this.authService.getUserId();
    this.userService.getUserById(userId).subscribe(user => {
      this.currentUser = user;
    })
  }


  getAllCommentForPost() {
    this.commentService.getAllCommentForPost(this.post.id).subscribe(comments => {
      this.comments = comments;
    })
  }


  goToUserProfile(userId: number) {
    this.router.navigateByUrl('users/user-profile/' + userId);
  }

  openModal(mode: string, comment: CommentModel) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    console.log(comment);
    if (mode === 'edit') {
      this.editComment = comment;
      console.log(this.editComment);
      this.editCommentForm = new FormGroup({
        id: new FormControl(this.editComment.id),
        text: new FormControl(this.editComment.text),
        likeCount: new FormControl(this.editComment.likeCount),
        heartCount: new FormControl(this.editComment.heartCount)
      });
      button.setAttribute('data-bs-target', '#editCommentModal');
    }
    if (mode === 'delete') {
      this.deletedComment = comment;
      button.setAttribute('data-bs-target', '#deleteCommentModal');
    }
    container.appendChild(button);
    button.click();
  }

  updateComment() {
    this.editComment.id =this.editCommentForm.get('id').value;
    this.editComment.text =this.editCommentForm.get('text').value;
    this.editComment.likeCount =this.editCommentForm.get('likeCount').value;
    this.editComment.heartCount =this.editCommentForm.get('heartCount').value;
    this.commentService.updateComment(this.editComment).subscribe(
      response => {
        console.log(response);
        document.getElementById("close-edit-comment-btn").click();
        this.getAllCommentForPost();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  deleteComment() {
    this.commentService.deleteComment(this.deletedComment.id).subscribe(
      () => {
        document.getElementById("close-delete-comment-btn").click();
        this.getAllCommentForPost();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

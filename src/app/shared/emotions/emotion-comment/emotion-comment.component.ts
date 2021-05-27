import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../../model/component/comment-model";
import {EmotionCommentPayload} from "./emotioncomment-payload";
import {EmotionCommentService} from "../../../services/emotion-comment.service";
import {AuthService} from "../../../auth/auth.service";
import {CommentService} from "../../../services/comment.service";
import {ToastrService} from "ngx-toastr";
import {EmotionType} from "../emotion/emotion-type";
import {throwError} from "rxjs";

@Component({
  selector: 'app-emotion-comment',
  templateUrl: './emotion-comment.component.html',
  styleUrls: ['./emotion-comment.component.css']
})
export class EmotionCommentComponent implements OnInit {

  @Input() comment: CommentModel;
  liked: boolean;
  hearted: boolean;
  emotionCommentPayLoad: EmotionCommentPayload;
  constructor(private emotionCommentService: EmotionCommentService,
              private authService: AuthService,
              private commentService: CommentService,
              private toastr: ToastrService) {
    this.emotionCommentPayLoad ={
    };
    }

  ngOnInit(): void {
    this.updateEmotionCommentDetails();
  }

  onLikeComment() {
    this.emotionCommentPayLoad.emotionType = EmotionType.LIKE;
    this.vote();
  }

  onHeartComment() {
    this.emotionCommentPayLoad.emotionType = EmotionType.HEART;
    this.vote();
  }

  private vote() {
    this.emotionCommentPayLoad.commentId = this.comment.id;
    this.emotionCommentService.sendEmotionComment(this.emotionCommentPayLoad).subscribe(() => {
      this.updateEmotionCommentDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateEmotionCommentDetails() {
    this.commentService.getCommentById(this.comment.id).subscribe(comment => {
      this.comment = comment;
      this.liked = this.comment.liked;
      this.hearted = this.comment.hearted;
    });
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../../post/post-model';
import {EmotionPayload} from './emotion-payload';
import {EmotionService} from '../../../services/emotion.service';
import {AuthService} from '../../../auth/auth.service';
import {PostService} from '../../../services/post.service';
import {ToastrService} from 'ngx-toastr';
import {EmotionType} from './emotion-type';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.css']
})
export class EmotionComponent implements OnInit {

  @Input() post: PostModel;
  liked: boolean;
  hearted: boolean;

  emotionPayload: EmotionPayload;
  constructor(private emotionService: EmotionService,
              private authService: AuthService,
              private postService: PostService,
              private toastr: ToastrService) {

    this.emotionPayload = {
    };
    }


  ngOnInit(): void {
    this.updateEmotionDetails();
  }

  onLikePost() {
    this.emotionPayload.emotionType = EmotionType.LIKE;

    this.vote();
  }
    onHeartPost() {
    this.emotionPayload.emotionType = EmotionType.HEART;

    this.vote();
    }

  private vote() {
    this.emotionPayload.postId = this.post.id;
    this.emotionService.sendEmotion(this.emotionPayload).subscribe(() => {
      this.updateEmotionDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateEmotionDetails() {
    this.postService.getPostById(this.post.id).subscribe(post => {
      this.post = post;
      this.liked = this.post.liked;
      this.hearted = this.post.hearted;
    });
  }
}

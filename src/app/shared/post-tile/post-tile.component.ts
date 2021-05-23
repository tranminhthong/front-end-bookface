import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../post/post-model';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input() posts: PostModel[] = [];

  constructor(private router: Router, private postService: PostService) {

  }

  ngOnInit(): void {

  }

  goToPost(id: number): void {

  }


}

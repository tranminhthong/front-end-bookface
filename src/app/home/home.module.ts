import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeRoutingModule} from './home-routing.module';
import {UpdateProfileComponent} from '../user/update-profile/update-profile.component';
import {UserProfileComponent} from '../user/user-profile/user-profile.component';
import {FriendComponent} from '../user/friend/friend.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TokenInterceptor} from '../../token-interceptor';
import {SideBarComponent} from '../shared/side-bar/side-bar.component';
import {HomeComponent} from './home.component';
import {NewsfeedComponent} from '../newsfeed/newsfeed.component';
import {PostTileComponent} from '../shared/post-tile/post-tile.component';
import {FriendRequestSideBarComponent} from '../shared/friend-request-side-bar/friend-request-side-bar.component';
import {EmotionComponent} from '../shared/emotions/emotion/emotion.component';
import {CommentComponent} from '../shared/comment/comment.component';
import {CreatePostComponent} from '../post/create-post/create-post.component';
import {UserHeaderComponent} from '../user/user-header/user-header.component';
import {EmotionCommentComponent} from "../shared/emotions/emotion-comment/emotion-comment.component";
import {MutualFriendComponent} from '../user/mutual-friend/mutual-friend.component';
import {SearchFriendComponent} from '../user/search-friend/search-friend.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { FriendButtonComponent } from '../user/friend-button/friend-button.component';
import {AuthGuard} from '../auth/auth.guard';
import {AdminModule} from '../admin/admin.module';


@NgModule({
  declarations: [
    HomeComponent,
    UpdateProfileComponent,
    UserProfileComponent,
    FriendComponent,
    SideBarComponent,
    NewsfeedComponent,
    PostTileComponent,
    FriendRequestSideBarComponent,
    EmotionComponent,
    EmotionCommentComponent,
    CommentComponent,
    CreatePostComponent,
    UserHeaderComponent,
    MutualFriendComponent,
    SearchFriendComponent,
    FriendButtonComponent,
  ],
  exports: [
    SideBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CKEditorModule,
    NgbModule,
    InfiniteScrollModule,
    AdminModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },AuthGuard]
})
export class HomeModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UpdateProfileComponent} from './user/update-profile/update-profile.component';
import {HomeComponent} from './home/home.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CreatePostComponent } from './post/create-post/create-post.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FriendComponent } from './user/friend/friend.component';
import {TokenInterceptor} from '../token-interceptor';
import {HomeModule} from './home/home.module';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { FriendRequestSideBarComponent } from './shared/friend-request-side-bar/friend-request-side-bar.component';
import { EmotionComponent } from './shared/emotion/emotion.component';
import { CommentComponent } from './shared/comment/comment.component';
import { ViewPostComponent } from './post/view-post/view-post.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ViewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    HomeModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  exports: [
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

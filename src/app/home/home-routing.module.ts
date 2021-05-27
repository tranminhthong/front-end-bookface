import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateProfileComponent} from '../user/update-profile/update-profile.component';
import {UserProfileComponent} from '../user/user-profile/user-profile.component';
import {FriendComponent} from '../user/friend/friend.component';
import {HomeComponent} from './home.component';
import {NewsfeedComponent} from '../newsfeed/newsfeed.component';
import {AuthGuard} from '../auth/auth.guard';
import {SearchFriendComponent} from '../user/search-friend/search-friend.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: NewsfeedComponent,
      },
      {
        path: 'users/update-profile/:id',
        component: UpdateProfileComponent
      },
      {
        path: 'users/user-profile/:id',
        component: UserProfileComponent
      },
      {
        path: 'users/list-friend/:id',
        component:  FriendComponent
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(module => module.AdminModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'users/search/:key',
        component: SearchFriendComponent
      },
      {
        path: 'users/list-mutual-friend/:id',
        component: FriendComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

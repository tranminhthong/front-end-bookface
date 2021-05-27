import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MemberComponent} from './member/member.component';
import {MemberBlockComponent} from './member-block/member-block.component';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  // {
  //   path: 'user-activated',
  //   component: MemberComponent
  // },
  // {
  //   path: 'user-blocked',
  //   component: MemberBlockComponent
  // }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {MemberComponent} from './member/member.component';
import {HomeRoutingModule} from '../home/home-routing.module';



@NgModule({
  declarations: [
    AdminComponent,
    MemberComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeRoutingModule
  ]
})
export class AdminModule { }

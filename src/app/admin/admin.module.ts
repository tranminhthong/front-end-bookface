import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberBlockComponent } from './member-block/member-block.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {MemberComponent} from './member/member.component';



@NgModule({
  declarations: [
    MemberBlockComponent,
    AdminComponent,
    MemberComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

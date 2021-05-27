import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HomeModule} from './home/home.module';


const routes: Routes = [
  {path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

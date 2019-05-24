// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './login/login.component';
// import { AuthGuard } from '../../_grauds/auth.guard';

// const routes: Routes = [{
//   path: 'auth',
//   canActivate: [AuthGuard],
//   children: [{
//     path: '',
//     component: LoginComponent,
//   }]
// }];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })

// export class AuthRoutingModule {}



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/_grauds/auth.guard';

import { LocalUserGuard } from 'src/app/_grauds/localUser.guard';
import { EditComponent } from './edit/edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [{
  path: 'auth',
  children: [{
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent, canActivate: [LocalUserGuard]
  }

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
exports: [RouterModule]
})

export class AuthRoutingModule { }

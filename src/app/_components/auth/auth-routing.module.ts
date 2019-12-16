import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../../_grauds/auth.guard';

import { LocalUserGuard } from '../../_grauds/localUser.guard';
import { EditComponent } from './edit/edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


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
  }, {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  }
    ,

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
  },
  {
    path: 'resetPassword/:token',
    component: ResetPasswordComponent
  }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})

export class AuthRoutingModule { }



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
//import { AdminGuard } from 'src/app/_grauds/Admin.guard';
// import { UsersComponent } from './users//users.component';
import { AdminGuard } from '../../_grauds/admin.guard';

const routes: Routes = [{
  path: 'admin',
  children: [{
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  
  //  {
  //   path: 'users',
  //   loadChildren: './users/users.module#UsersModule'
    
  // }
   {
    path: 'users',
    component: UserManagementComponent,canActivate:[AdminGuard]
  }, 

//{
//     path: 'forgotPassword',
//     component: ForgotPasswordComponent}
// ,
//   {
//     path: 'profile',
//     component: ProfileComponent, canActivate: [AuthGuard]
//   },
//   {
//     path: 'edit',
//     component: EditComponent, canActivate: [AuthGuard]
//   },
//   {
//     path: 'changePassword',
//     component: ChangePasswordComponent, canActivate: [LocalUserGuard]
//   },

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  

exports: [RouterModule]
})

export class AdminRoutingModule { }

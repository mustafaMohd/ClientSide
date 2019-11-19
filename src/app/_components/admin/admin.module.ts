import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/SharedModule.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { UserComponent } from './user-management/user-list/user/user.component';
import { AuthenticationService } from 'src/app/_services';
import { AdminUserService } from './../../_services/adminServices/adminUser.service';
 
 
@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    UserComponent,
      
  ],
  imports: [
  CommonModule,
    SharedModule,
    
//  FormsModule, ReactiveFormsModule ,
    AdminRoutingModule,
  ],
  
  providers: [
    AuthenticationService,AdminUserService
   
   
  ]
})
export class AdminModule { }

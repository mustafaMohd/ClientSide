import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/SharedModule.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { UserComponent } from './user-management/user-list/user/user.component';
import { AuthenticationService } from 'src/app/_services';
import { AdminUserService } from './../../_services/adminServices/adminUser.service';
import { CreateUserComponent } from './user-management/create/create.user.component';
import { EditUserComponent } from './user-management/edit/edit.user.component';
// import { SearchAndPaginationModule } from '../seachAndPagination/SearchAndPagination.module';

 
@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
  ],
  imports: [
  CommonModule,
    SharedModule,
    //SearchAndPaginationModule,
    
//  FormsModule, ReactiveFormsModule ,
    AdminRoutingModule,
  ],
  
  providers: [
    AuthenticationService,AdminUserService
   
   
  ]
})
export class AdminModule { }

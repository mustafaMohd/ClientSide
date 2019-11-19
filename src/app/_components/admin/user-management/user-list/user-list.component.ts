import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models';
import { AdminUserService } from '../../../../_services/adminServices/adminUser.service'


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  // usersChanged = new EventEmitter<User[]>();
  
  constructor( private adminUserService:AdminUserService) { }
  
  ngOnInit() {
     this.adminUserService.getAllUsers().subscribe(users=>{
       this.users=users;
     })
    ;

  }

}

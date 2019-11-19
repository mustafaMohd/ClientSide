import { Component, OnInit , OnDestroy  } from '@angular/core';
import { User } from '../../../_models/index';
import { Subscription } from 'rxjs';
// import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../_services';
import { Router } from '@angular/router';
import { Role } from 'src/app/_models/Role';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy  {
  
  currentUser: User;
  currentUserSubscription: Subscription;
  // users: User[] = [];


  constructor( private router: Router,private authenticationService: AuthenticationService,
   ) {
     
   

    }
    
  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;

    })

    // *ngIf="currentUser.method==='local'"
  
    // this.loadAllUsers();

  }
  onAdmin(){
    this.router.navigate(['/admin/users']);
  
  }
  localUser(){
    if(this.currentUser.method==='local'){
      return true;
  
  
    } 
    return false;
  }
  
  isAdmin(){
    
    if(this.currentUser.roles.indexOf(Role.admin) > -1){
      return true;
  
  
    } 
    return false;
  }
  // onAdmin(){
  //   this.router.navigate(['/admin/users']);
  
  // }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  // deleteUser(id: number) {
//   this.userService.delete(id).pipe(first()).subscribe(() => {
//       this.loadAllUsers( );
//   });
// }
// private loadAllUsers() {
//   this.userService.getAll().pipe(first()).subscribe(users => {
//       this.users = users;
//   });
// }
}

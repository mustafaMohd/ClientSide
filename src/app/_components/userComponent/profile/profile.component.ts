import { Component, OnInit , OnDestroy  } from '@angular/core';
import { User } from '../../../_models/index';
import { Subscription } from 'rxjs';
// import { first } from 'rxjs/operators';
import { AuthenticationService, UserService } from '../../../_services';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent   {
  
  currentUser: User;
  currentUserSubscription: Subscription;
  // users: User[] = [];


  constructor( private authenticationService: AuthenticationService,
   ) {
     
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
    })


    }
    
  // ngOnInit() {
  //   // this.loadAllUsers();

  // }

//   ngOnDestroy() {
//     // unsubscribe to ensure no memory leaks
//     this.currentUserSubscription.unsubscribe();
// }
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

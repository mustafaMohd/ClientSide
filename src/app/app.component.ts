// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'ClientSide';

// }
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { Subscription } from 'rxjs';
import { AlertService } from './_services/alert.service';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class  AppComponent implements OnInit, OnDestroy {
     currentUser: User;
   
currentUserSubscription: Subscription;

    
    title = 'testingPortal.pk';
    constructor( 
        private router: Router,private alertService :AlertService,
        private authenticationService: AuthenticationService
    ) {
       
    }
   
    ngOnInit(): void {
        this.currentUserSubscription= this.authenticationService.currentUser.subscribe(x =>{
            
            this.currentUser = x;
           
        } );
        const timer = JSON.parse(localStorage.getItem('timer'));
        if (timer && (Date.now() > timer)) {
          this.authenticationService.logout();
          this.alertService.success(`You have be sign out`);
  
          setTimeout(()=>{
            this.alertService.clear();            
            
          },3000);
          
          this.router.navigate(['/auth/login']);
        }  
    
    }
   

    ngOnDestroy(): void {
        if (this.currentUserSubscription) {
    
        
        this.currentUserSubscription.unsubscribe();
     }
    }
   
    
    
    logout() {
        this.authenticationService.logout();
        this.alertService.success(`successfully logout`);
        setTimeout(()=>{
            this.alertService.clear();            
            
          },3000);
  
        
      this.router.navigate(['/auth/login']);
    
   
         }
}

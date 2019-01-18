import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models';
import { AuthenticationService } from './../../_services/authentication.service';
import { Subscription } from 'rxjs';
// import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  
  
  currentUser: User;
  currentUserSubscription: Subscription;


  constructor(private authenticationService: AuthenticationService) {
   
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
    })
  }
 
  

  onLogout() {
    this.authenticationService.logout();

  
  }
  ngOnInit() {
    
    

    
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
   
  }

}

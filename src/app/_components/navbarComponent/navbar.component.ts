import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models';
import { AuthenticationService } from './../../_services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { AlertService } from './../../_services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  
  
  currentUser: User;
  currentUserSubscription: Subscription;


  constructor(private authenticationService: AuthenticationService,
    private router: Router,private AlertService:AlertService) {
   
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
    })
  }
 
  

  onLogout() {
    this.authenticationService.logout();
    this.AlertService.success(`successfully logout`);

  this.AlertService.clear();            

  
  }
  
  ngOnInit() {
    
    

    
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
   
  }

}

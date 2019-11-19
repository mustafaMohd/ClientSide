import { Component, Input, OnInit, OnDestroy } from '@angular/core';

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
export class NavbarComponent  {
  
  @Input() currentUser: any = {};
  @Input() title: any = "";


  // currentUser: User;
  // currentUserSubscription: Subscription;


  constructor(private authenticationService: AuthenticationService,
    private router: Router,private AlertService:AlertService) {
   
  }
 
  

  onLogout() {
    this.authenticationService.logout();
    this.AlertService.success(`successfully logout`);
    setTimeout(()=>{
      this.AlertService.clear();            
      
    },3000);

  this.router.navigate(['']);
   
  
  }
  onProfile(){
    this.router.navigate(['/auth/profile']);
  
  }
  
  // onAdmin(){
  //   this.router.navigate(['/admin/users']);
  
  // }
  
  // ngOnInit() {
    
  //   const timer = JSON.parse(localStorage.getItem('timer'));
  //   if (timer && (Date.now() > timer)) {
  //     this.authenticationService.logout();
  //     this.router.navigate(['/login']);
  //   }  

    
  // }
  // ngOnDestroy() {
  //   // this.currentUserSubscription.unsubscribe();
   
  // }

}

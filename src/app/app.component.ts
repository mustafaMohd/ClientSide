// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'ClientSide';

// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
    currentUser: User;
    isLoggedIn:boolean=false;
    
    title = 'ClientSide';
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x =>{
            
            this.currentUser = x;
            this.isLoggedIn=true;
        } );
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}

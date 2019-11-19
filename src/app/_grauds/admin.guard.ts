import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { Role } from '../_models/Role';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const isAdmin=currentUser && currentUser.roles.indexOf('admin') > -1
        
        if ( !isAdmin) 
        {
            this.router.navigate(['/auth/profile'], { queryParams: { returnUrl: state.url } });
        return false;
            // logged in so return true
            //return true;
        }
        return true;

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        // return false;
    
    }
}

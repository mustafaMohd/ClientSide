import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../_services/authentication.service';
import { AlertService } from './../../../_services/alert.service';
import {
    AuthService as SocialAuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
  } from 'angularx-social-login';
@Component({
    templateUrl: './login.component.html',
    styleUrls: ["./login.component.css"]

})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    // error = '';
    hide= false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private socialAuthService: SocialAuthService
    ) { 
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/auth/profile']);
        }   
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });


        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    // convenience getter for easy access to form fields
    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }







    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        //console.log(this.email.value, this.password.value);
        this.authenticationService.login(this.email.value, this.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success(  ` Wellcome back ${data.user.fullname} `);
                    this.router.navigate([this.returnUrl]); 
                    
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },3000);
                   
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },3000);
                });
    }

    //To be done change the settimeout to seconds
    facebookLogin() {
        let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
                //this will return user data from facebook. What you need is a user token which you will send it to the server
                // this.sendToRestApiMethod(userData.token);
                this.loading = true;
                this.authenticationService.fbLogin(userData.authToken)
                .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.alertService.success(  ` Wellcome  ${data.user.fullname} `);
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },3000);
                },
                error => {
                    this.loading = false;
                    this.alertService.error(error);
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },13000);
            
                });
           }
        );
    }
    googleLogin() {
        let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
                //this will return user data from facebook. What you need is a user token which you will send it to the server
                // this.sendToRestApiMethod(userData.token);
                this.loading = true;
                this.authenticationService.googleLogin(userData.authToken)
                .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success(  ` Wellcome  ${data.user.fullname} `);
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },3000);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;

                    this.alertService.error(error);
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },3000);
            
                });
           }
        );
    }


}

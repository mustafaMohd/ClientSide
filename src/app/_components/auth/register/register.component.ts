import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../../../_services';
import { ErrorStateMatcher } from '@angular/material';
import {
    AuthService as SocialAuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
  } from 'angularx-social-login';






export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }


@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private socialAuthService: SocialAuthService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // tslint:disable-next-line:no-trailing-whitespace
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }
    
    passwordValidator(fg:FormGroup){
        const condition=fg.get('password').value !== fg.get('verifyPassword').value;
        return condition ? {passwordDonotMatach:true}:null;
    }
//    emailValidator(fg:FormGroup){
//         const email=fg.get('email').value;
//         const existedEmail= this.userService.findByEmail;

//         return condition ? {passwordDonotMatach:true}:null;
//     }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            
            email: ['',[Validators.required,Validators.email] ],
            
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
            verifyPassword:['',[Validators.required]]
        
        },{validator:this.passwordValidator}
        );
    
    
    }
    matcher = new MyErrorStateMatcher()
    // parentErrorStateMatcher = new ParentErrorStateMatcher();
    // // convenience getter for easy access to form fields
    // get f() { return this.registerForm.controls; }

    get fullname() { return this.registerForm.get('fullname'); }
    get email() { return this.registerForm.get('email'); }
    get password() { return this.registerForm.get('password'); }
    get verifyPassword() { return this.registerForm.get('verifyPassword'); }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.registerForm.value)
       
        this.authenticationService.register(this.fullname.value, this.email.value, this.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },3000);
                    this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },15000);
                });
    }
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
                    this.router.navigate(['/']);
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
                    this.router.navigate(['/']);
                },
                error => {
                    this.loading = false;

                    this.alertService.error(error);
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },6000);
            
                });
           }
        );
    }





}

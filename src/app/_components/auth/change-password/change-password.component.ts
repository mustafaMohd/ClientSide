import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { MustMatch } from 'src/app/_helpers';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit,OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  
  changepasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,

    private alertService: AlertService) { }



    
  // ngOnInit() {

  // }

  ngOnInit() {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;


      })

      this.changepasswordForm = this.formBuilder.group({
       
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
        
        
        newPassword: ['', [Validators.required, Validators.maxLength(40)]],
        verifyNewPassword:['',[Validators.required]],
        
            
    },{validator:MustMatch('newPassword', 'verifyNewPassword')}
    );
    
    
  }
  get password() { return this.changepasswordForm.get('password'); }
 
  get newPassword() { return this.changepasswordForm.get('newPassword'); }
 
  get verifyNewPassword() { return this.changepasswordForm.get('verifyNewPassword'); }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changepasswordForm.invalid) {
        return;
    }

    this.loading = true;

   
    this.authenticationService.changePassword(this.password.value, this.newPassword.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Password changed successfully', true);
                setTimeout(()=>{
                    this.alertService.clear();            
                    
                  },5000);
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
                setTimeout(()=>{
                    // this.alertService.clear();            
                    
                  },15000);
            });
}


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}

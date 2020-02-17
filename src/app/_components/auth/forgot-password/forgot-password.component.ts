import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { AlertService } from '../../../_services/alert.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hide= false;
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,

    private alertService: AlertService
  ) { 

// redirect to home if already logged in
        // tslint:disable-next-line:no-trailing-whitespace
        if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/auth/profile']);
          
      }

  }

  ngOnInit() {


    this.forgetPasswordForm = this.formBuilder.group({
      
      
      email: ['',[Validators.required,Validators.email] ],
      
          
  }
  );

  }
  get email() { return this.forgetPasswordForm.get('email'); }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgetPasswordForm.invalid) {
        return;
    }

    this.loading = true;

    console.log(this.forgetPasswordForm.value)
   
    this.authenticationService.forgotPassword(this.email.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Reset email sent successful', true);
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
  

}

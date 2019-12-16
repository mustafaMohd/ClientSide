import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthenticationService, AlertService } from '../../../_services';
import { MustMatch } from '../../../_helpers/mustMatch';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
   token: string;
 
  resetPasswordForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    
    private alertService: AlertService) 
    { 

  }
  
  ngOnInit() {
    this.token=this.route.snapshot.paramMap.get("token");
    //this.token = this.route.params.pipe(map(p => p.token==this.token));

    this.resetPasswordForm = this.formBuilder.group({
      resetToken: [this.token],

      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      verifyPassword:['',[Validators.required]]
  
  },{validator:MustMatch('password', 'verifyPassword')}
  );

  }

  get password() { return this.resetPasswordForm.get('password'); }

  get resetToken() { return this.resetPasswordForm.get('resetToken'); }

  get verifyPassword() { return this.resetPasswordForm.get('verifyPassword'); }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
        return;
    }

    this.loading = true;

    console.log(this.resetPasswordForm.value)
   
    this.authenticationService.resetPassword(this.resetToken.value,this.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success(`successful password Resest fo ${data.user.email}`, true);
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

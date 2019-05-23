import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,

        private alertService: AlertService
   
  ) { }

  ngOnInit() {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;


      })

      this.updateForm = this.formBuilder.group({
        fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        
        email: ['',[Validators.required,Validators.email] ],
        
            
    }
    );
    this.updateForm.patchValue({
      fullname: this.currentUser.fullname,
      email: this.currentUser.email,
     
    })
    
    
  }
  get fullname() { return this.updateForm.get('fullname'); }
  get email() { return this.updateForm.get('email'); }
 
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }

    this.loading = true;

   
    this.authenticationService.update(this.fullname.value, this.email.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Updated successfully', true);
                setTimeout(()=>{
                    this.alertService.clear();            
                    
                  },3000);
                this.router.navigate(['/auth/profile']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
                setTimeout(()=>{
                    this.alertService.clear();            
                    
                  },15000);
            });
}
  
  
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }








}

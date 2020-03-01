import { Component,OnDestroy, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService} from '../../../../_services';
import { ErrorStateMatcher } from '@angular/material';
import { AdminUserService } from '../../../../_services/adminServices/adminUser.service'
import { MustMatch } from '../../../../_helpers/mustMatch';






export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }


@Component({
    selector: 'create-user',
    templateUrl: './create.user.component.html',
styleUrls: ['./create.user.component.css']
})
export class CreateUserComponent implements OnInit,OnDestroy {
    @Input()   displayNewDialog: boolean;
    @Output() displayNewDialogChange = new EventEmitter();
    createForm: FormGroup;
    loading = false;
    submitted = false;
    hide= false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private adminUserService: AdminUserService,
        
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // tslint:disable-next-line:no-trailing-whitespace
        
    }
    
//     passwordValidator(fg:FormGroup){
//         const condition=fg.get('password').value !== fg.get('verifyPassword').value;
//         return condition ? {passwordDonotMatch:true}:null;
//     }
// //    emailValidator(fg:FormGroup){
//         const email=fg.get('email').value;
//         const existedEmail= this.userService.findByEmail;

//         return condition ? {passwordDonotMatach:true}:null;
//     }
    ngOnInit() {
        this.createForm = this.formBuilder.group({
            fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            
            email: ['',[Validators.required,Validators.email] ],
            
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
            verifyPassword:['',[Validators.required]]
        
        },{validator:MustMatch('password', 'verifyPassword')}
        );
    
    
    }
    ngOnDestroy() {
        this.displayNewDialogChange.unsubscribe();
      }
      
    get fullname() { return this.createForm.get('fullname'); }
    get email() { return this.createForm.get('email'); }
    get password() { return this.createForm.get('password'); }
    get verifyPassword() { return this.createForm.get('verifyPassword'); }

    onClose() {
 
  this.displayNewDialogChange.emit(false);
    }
    
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.createForm.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.createForm.value)
       
        this.adminUserService.create(this.fullname.value, this.email.value, this.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.createForm.reset();
                    
                    this.loading = false;
                    
                    this.alertService.success(`  ${data.user.fullname} ! Added`, true);
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },3000);

                    // this.router.navigate(['']);
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

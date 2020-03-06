import { Component, OnDestroy, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { User } from './../../../../_models';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../../_services';
import { first } from 'rxjs/operators';
import { MustMatch } from './../../../../_helpers';
import { AdminUserService ,} from '../../../../_services/adminServices/adminUser.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements  OnChanges,OnDestroy {
  user: User;
  @Input()
  userSubject:Subject<User>;
  
  //@Input() currentUser: Observable<User>;
  
  @Input()   displayChangePasswordDialog: boolean;
  @Output() displayChangePasswordDialogChange = new EventEmitter();
  
  
  
  changepasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';  
  hide= false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private adminUserService: AdminUserService,

    private alertService: AlertService) { }



    
  // ngOnInit() {

  // }

  ngOnChanges() {

    
    this.userSubject.subscribe(data => {
      this.user=data
      // called when the notifyChildren method is
      // called in the parent component
    });

      this.changepasswordForm = this.formBuilder.group({
       
        
        newPassword: ['', [Validators.required, Validators.maxLength(40)]],
        verifyNewPassword:['',[Validators.required]],
        
            
    },{validator:MustMatch('newPassword', 'verifyNewPassword')}
    );
    
    
  }
  get newPassword() { return this.changepasswordForm.get('newPassword'); }
 
  get verifyNewPassword() { return this.changepasswordForm.get('verifyNewPassword'); }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changepasswordForm.invalid) {
        return;
    }

    this.loading = true;

   
    this.adminUserService.changePassword(this.user._id,this.newPassword.value)
        .pipe(first())
        .subscribe(
          user => {
              this.loading=false;
              this.alertService.success(`${user.fullname} ! password changed successfully `, true);
           
                setTimeout(()=>{
                    this.alertService.clear();            
                    
                  },35000);
                // this.router.navigate(['/auth/profile']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
                setTimeout(()=>{
                    // this.alertService.clear();            
                    
                  },30000);
            });
}


onClose() {
 
  this.displayChangePasswordDialogChange.emit(false);
    }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.displayChangePasswordDialogChange.unsubscribe();
    this.userSubject.unsubscribe();

  }

}

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService } from '../../../../_services';
import { User } from 'src/app/_models';
import { Subscription, Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AdminUserService } from '../../../../_services/adminServices/adminUser.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit.user.component.html',
  styleUrls: ['./edit.user.component.css']
})
export class EditUserComponent implements OnChanges,OnDestroy {
   user: User;
  @Input()
  userSubject:Subject<User>;
  
  //@Input() currentUser: Observable<User>;
  @Input()   displayEditDialog: boolean;
  @Output() displayEditDialogChange = new EventEmitter();
  
  
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
        private router: Router,
        private adminUserService: AdminUserService,
        
        private alertService: AlertService
   
  ) { }

  ngOnChanges() {
    
    this.userSubject.subscribe(data => {
      this.user=data
      // called when the notifyChildren method is
      // called in the parent component
    });
      this.updateForm = this.formBuilder.group({
        fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        
        email: ['',[Validators.required,Validators.email] ],
        
            
    }
    );

    this.updateForm.patchValue({
      fullname: this.user.fullname,
      email: this.user.email,
     
    })
  
    
  }


  get fullname() { return this.updateForm.get('fullname'); }
  get email() { return this.updateForm.get('email'); }
 

  onClose() {
 
    this.displayEditDialogChange.emit(false);
      }
  


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;


    this.adminUserService.update(this.user._id, this.fullname.value, this.email.value)
      .pipe(first())
      .subscribe(
        user => {
          this.loading = false;
         
          this.alertService.success(` ${user.fullname} Updated successfully`, true);
         
          setTimeout(() => {
            this.alertService.clear();

          }, 3000);
          // this.router.navigate(['/admin/users']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          setTimeout(() => {
            this.alertService.clear();

          }, 15000);
        });
  }



  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.displayEditDialogChange.unsubscribe();
    this.userSubject.unsubscribe();
  }





}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/SharedModule.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from '../../_services/authentication.service';
import { AuthRoutingModule } from './auth-routing.module';
import { ProfileComponent } from './profile';
import { getAuthServiceConfigs } from './socialloginConfig';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
//  FormsModule, ReactiveFormsModule ,
    AuthRoutingModule,
    SocialLoginModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  providers: [
    AuthenticationService,
    {provide: AuthServiceConfig,useFactory: getAuthServiceConfigs},
   
  ]
})
export class AuthModule { }

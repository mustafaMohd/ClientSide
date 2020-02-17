import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';

import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
// import { UserService } from './_services';
// import {
//     MatToolbarModule, MatMenuModule,
//     MatButtonModule, MatInputModule,
//     MatSidenavModule,
//     MatSelectModule,MatDividerModule,
//     MatIconModule, MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule
// } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
// import { getAuthServiceConfigs } from './_components/auth/socialloginConfig';

import { HomeComponent } from './_components/homeComponent';


// import { LoginComponent } from './_components/userComponent/login';
// import { RegisterComponent } from './_components/userComponent/register';
// import { ProfileComponent } from './_components/userComponent/profile';


import { AlertComponent } from './_components/alertComponent/alert.component';
import { NavbarComponent } from './_components/navbarComponent/navbar.component';

import { SharedModule } from './_components/shared/SharedModule.module';
import { AuthModule } from './_components/auth/auth.module';
import { AdminModule } from './_components/admin/admin.module';
import { SpinnerComponent } from './_components/shared/spinner.component';
// import { UserListComponent } from './_components/admin/user-management/user-list/user-list.component';
// import { ForgotPasswordComponent } from './_components/auth/forgot-password/forgot-password.component';
@NgModule({
    imports: [
        BrowserModule,
        // FormsModule,
        // ReactiveFormsModule,
        HttpClientModule,
        AuthModule,
        AdminModule,

        AppRoutingModule,
        SharedModule,
        
       
        
        BrowserAnimationsModule,
        // SocialLoginModule,
        
    ],
    declarations: [
        AppComponent,
        // ProfileComponent,
        // LoginComponent,
        // RegisterComponent,
        HomeComponent,
        AlertComponent,
       
        NavbarComponent,
        SpinnerComponent

    ],
    providers: [
        // UserService,
        // {provide: AuthServiceConfig,useFactory: getAuthServiceConfigs},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

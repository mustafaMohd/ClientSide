import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import {  ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { UserService } from './_services';
import {MatToolbarModule,MatMenuModule ,
    MatButtonModule,MatInputModule,
     MatSidenavModule, 
     MatSelectModule,
    MatIconModule,MatFormFieldModule,MatCardModule,MatListModule, MatProgressBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './_components/userComponent/login';
import { HomeComponent } from './_components/homeComponent';

import { RegisterComponent } from './_components/userComponent/register';
import { NavbarComponent } from './_components/navbarComponent/navbar.component';
import { ProfileComponent } from './_components/userComponent/profile';
import { AlertComponent } from './_components/alertComponent/alert.component';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        
        MatCardModule,
        MatMenuModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressBarModule
    ],
    declarations: [
        AppComponent,
        ProfileComponent,
        LoginComponent,
        HomeComponent,
        AlertComponent,
        RegisterComponent,
        NavbarComponent,
        
    ],
    providers: [
      UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
            ],
    bootstrap: [AppComponent]
})

export class AppModule { }

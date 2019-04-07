import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/homeComponent';
// import { LoginComponent } from './_components/userComponent/login';
// import { RegisterComponent } from './_components/userComponent/register';
// import { ProfileComponent } from './_components/userComponent/profile';
import { AuthGuard } from './_grauds';


const appRoutes: Routes = [
    {
        path: '',
         component: HomeComponent,
        },
    
    {
                path: 'auth',
     loadChildren: './_components/auth/auth.module#AuthModule'
    },
    // app/_components/auth/auth.module#AuthModule
    
   
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }

// export const routing = RouterModule.forRoot(appRoutes);

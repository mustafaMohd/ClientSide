import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { AuthGuard } from './_grauds/auth.guard';
import { HomeComponent } from './_components/home/home.component';

const appRoutes: Routes = [
    {
        path: '',
         component: HomeComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// export const routing = RouterModule.forRoot(appRoutes);

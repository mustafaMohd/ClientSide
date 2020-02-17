import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/homeComponent';
import { AdminGuard } from './_grauds';
import { AuthGuard } from './_grauds';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'auth',
   // loadChildren: './_components/auth/auth.module#AuthModule'
   loadChildren:  () => import('./_components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren:  () => import('./_components/admin/admin.module').then(m => m.AdminModule)
//s    loadChildren: './_components/admin/admin.module#AdminModule'
  },
  // app/_components/auth/auth.module#AuthModule


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule { }

// export const routing = RouterModule.forRoot(appRoutes);

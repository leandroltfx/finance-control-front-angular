import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'user-registration', loadChildren: () => import('./modules/user-registration/user-registration.module').then(m => m.UserRegistrationModule) },
  { path: 'reset-password', loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

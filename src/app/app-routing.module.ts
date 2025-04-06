import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum } from './shared/enum/routes.enum';

const routes: Routes = [
  { path: RoutesEnum.LOGIN, loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: RoutesEnum.RESET_PASSWORD, loadChildren: () => import('./features/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: RoutesEnum.USER_REGISTRATION, loadChildren: () => import('./features/user-registration/user-registration.module').then(m => m.UserRegistrationModule) },
  { path: '**', redirectTo: RoutesEnum.LOGIN }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

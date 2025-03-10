import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum } from './shared/enum/routes.enum';

const routes: Routes = [
  { path: RoutesEnum.LOGIN, loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: RoutesEnum.USER_REGISTRATION, loadChildren: () => import('./modules/user-registration/user-registration.module').then(m => m.UserRegistrationModule) },
  { path: RoutesEnum.RESET_PASSWORD, loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.RecoverPasswordModule) },
  { path: RoutesEnum.HOME, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: RoutesEnum.LOGIN },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

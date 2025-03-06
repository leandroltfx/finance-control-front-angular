import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum } from './shared/enum/routes.enum';

const routes: Routes = [
  { path: RoutesEnum.LOGIN, loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: RoutesEnum.USER_REGISTRATION, loadChildren: () => import('./modules/user-registration/user-registration.module').then(m => m.UserRegistrationModule) },
  { path: 'recover-password', loadChildren: () => import('./modules/recover-password/recover-password.module').then(m => m.RecoverPasswordModule) },
  { path: '**', redirectTo: RoutesEnum.LOGIN },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

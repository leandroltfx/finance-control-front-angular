import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum } from './shared/enum/routes.enum';
import { homeGuard } from './core/guards/home/home.guard';

const routes: Routes = [
  { path: RoutesEnum.LOGIN, loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: RoutesEnum.RESET_PASSWORD, loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: RoutesEnum.USER_REGISTRATION, loadChildren: () => import('./modules/user-registration/user-registration.module').then(m => m.UserRegistrationModule) },
  { path: RoutesEnum.HOME, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [homeGuard] },
  { path: '**', redirectTo: RoutesEnum.LOGIN }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

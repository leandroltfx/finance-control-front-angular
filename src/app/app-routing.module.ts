import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum } from './shared/enum/routes.enum';

const routes: Routes = [
  { path: RoutesEnum.LOGIN, loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: RoutesEnum.OTHER, redirectTo: RoutesEnum.LOGIN }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

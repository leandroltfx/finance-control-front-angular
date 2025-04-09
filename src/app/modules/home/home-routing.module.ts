import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { RoutesEnum } from '../../shared/enum/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: RoutesEnum.BANK_ACCOUNTS, loadChildren: () => import('./bank-accounts/bank-accounts.module').then(m => m.BankAccountsModule) },
      { path: RoutesEnum.MOVEMENTS, loadChildren: () => import('./movements/movements.module').then(m => m.MovementsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

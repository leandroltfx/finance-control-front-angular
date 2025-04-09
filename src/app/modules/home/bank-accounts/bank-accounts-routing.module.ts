import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankAccountsComponent } from './bank-accounts.component';

const routes: Routes = [
  { path: '', component: BankAccountsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankAccountsRoutingModule { }

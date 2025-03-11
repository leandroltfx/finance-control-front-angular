import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountsComponent } from './bank-accounts.component';
import { BankAccountsRoutingModule } from './bank-accounts-routing.module';

@NgModule({
  declarations: [
    BankAccountsComponent
  ],
  imports: [
    CommonModule,

    BankAccountsRoutingModule
  ]
})
export class BankAccountsModule { }

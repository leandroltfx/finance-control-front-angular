import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountsComponent } from './bank-accounts.component';
import { BankAccountsRoutingModule } from './bank-accounts-routing.module';
import { BankAccountsService } from './acl/service/bank-accounts.service';
import { BankAccountsProxyService } from './acl/proxy/bank-accounts-proxy.service';
import { BankAccountsAdapterService } from './acl/adapter/bank-accounts-adapter.service';

@NgModule({
  declarations: [
    BankAccountsComponent,
  ],
  imports: [
    CommonModule,

    BankAccountsRoutingModule,
  ],
  providers: [
    BankAccountsService,
    BankAccountsProxyService,
    BankAccountsAdapterService,
  ]
})
export class BankAccountsModule { }

import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { BankAccountsDto } from './models/dto/bank-accounts-dto';
import { AuthService } from '../../../core/services/auth/auth.service';
import { BankAccountsService } from './acl/service/bank-accounts.service';

@Component({
  selector: 'fc-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent {

  constructor(
    private readonly _authService: AuthService,
    private readonly _bankAccountsService: BankAccountsService,
  ) { }

  public ngOnInit(): void {
    this._getBankAccounts();
  }

  private _getBankAccounts(): void {
    this._bankAccountsService.getBankAccounts(
      String(this._authService.loggedUser?.id)
    ).subscribe(
      {
        next: (bankAccountsDto: BankAccountsDto) => console.log(bankAccountsDto),
        error: (httpErrorResponse: HttpErrorResponse) => console.log(httpErrorResponse),
      }
    )
  }
}

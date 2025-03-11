import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../core/services/auth/auth.service';
import { BankAccountsService } from './acl/service/bank-accounts.service';
import { BankAccountDto } from './models/dto/bank-accounts-dto';

@Component({
  selector: 'fc-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent {

  public bankAccountDto: BankAccountDto[] = []

  constructor(
    private readonly _authService: AuthService,
    private readonly _bankAccountsService: BankAccountsService,
  ) { }

  public ngOnInit(): void {
    this._getBankAccounts();
  }

  private _getBankAccounts(): void {
    this._bankAccountsService.getBankAccounts(
      this._authService.loggedUser?.id
    ).subscribe(
      {
        next: (bankAccountsDto: BankAccountDto[]) =>this.bankAccountDto = bankAccountsDto,
        error: (httpErrorResponse: HttpErrorResponse) => console.log(httpErrorResponse),
      }
    )
  }
}

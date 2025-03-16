import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Message } from '../../../shared/enum/message.enum';
import { BankAccountDto } from './models/dto/bank-account-dto';
import { AuthService } from '../../../core/services/auth/auth.service';
import { BankAccountsService } from './acl/service/bank-accounts.service';

@Component({
  selector: 'fc-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent {

  public bankAccountsDto: BankAccountDto[] = [];
  public errorMessage!: string;

  constructor(
    private readonly _authService: AuthService,
    private readonly _bankAccountsService: BankAccountsService,
  ) { }

  public ngOnInit(): void {
    this.getBankAccounts();
  }

  public getBankAccounts(): void {
    this._bankAccountsService.getBankAccounts(
      this._authService.loggedUser?.id
    ).subscribe(
      {
        next: (bankAccountsDto: BankAccountDto[]) => {
          this.bankAccountsDto = bankAccountsDto;
          this.errorMessage = '';
        },
        error: (httpErrorResponse: HttpErrorResponse) => this.errorMessage = httpErrorResponse.error['message'] ?? Message.DEFAULT_HTTP_ERROR_MESSAGE,
      }
    )
  }
}

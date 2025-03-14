import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { BankAccountDto } from '../../models/dto/bank-account-dto';
import { BankAccountsProxyService } from '../proxy/bank-accounts-proxy.service';
import { BankAccountsAdapterService } from '../adapter/bank-accounts-adapter.service';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';

@Injectable()
export class BankAccountsService {

  constructor(
    private readonly _bankAccountsProxyService: BankAccountsProxyService,
    private readonly _bankAccountsAdapterService: BankAccountsAdapterService,
  ) { }

  public getBankAccounts(
    userId: string | undefined
  ): Observable<BankAccountDto[]> {

    if (!userId) {
      return throwError(() => new Error('userId não informado.'));
    }

    return this._bankAccountsProxyService.getBankAccounts(
      this._bankAccountsAdapterService.toRequestContract(userId)
    ).pipe(
      map((bankAccountsResponseContract: BankAccountsResponseContract) => this._bankAccountsAdapterService.toDto(bankAccountsResponseContract)),
      catchError((httpErroResponse: HttpErrorResponse) => throwError(() => httpErroResponse)),
    );
  }
}

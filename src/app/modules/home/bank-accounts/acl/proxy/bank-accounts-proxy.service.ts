import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../../environments/environment';
import { BankAccountsRequestContract } from '../../models/contracts/request/bank-accounts-request-contract';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';

@Injectable()
export class BankAccountsProxyService {

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  public getBankAccounts(
    bankAccountsRequestContract: BankAccountsRequestContract,
  ): Observable<BankAccountsResponseContract> {
    return this._httpClient.get<BankAccountsResponseContract>(`${environment.api_path}/bank-accounts/${bankAccountsRequestContract.userId}`)
      .pipe(
        map((bankAccountsResponseContract: BankAccountsResponseContract) => bankAccountsResponseContract),
        catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse)),
      )
  }
}

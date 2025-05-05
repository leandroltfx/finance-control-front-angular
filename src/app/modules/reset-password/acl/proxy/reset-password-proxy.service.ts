import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment.development';
import { ResetPasswordRequestContract } from '../../../../shared/model/contracts/request/reset-password/reset-password-request-contract';
import { ResetPasswordResponseContract } from '../../../../shared/model/contracts/response/reset-password/reset-password-response-contract';

@Injectable()
export class ResetPasswordProxyService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public sendCodeToEmail(
    resetPasswordRequestContract: ResetPasswordRequestContract
  ): Observable<ResetPasswordResponseContract> {
    return this._httpClient.post<ResetPasswordResponseContract>(
      `${environment.api_path}/reset-password`,
      resetPasswordRequestContract
    ).pipe(
      map((resetPasswordResponseContract: ResetPasswordResponseContract) => resetPasswordResponseContract),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

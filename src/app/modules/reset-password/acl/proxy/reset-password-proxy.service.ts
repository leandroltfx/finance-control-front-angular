import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { ResetPasswordRequestContract } from '../../models/contracts/request/reset-password-request-contract';
import { ResetPasswordResponseContract } from '../../models/contracts/response/reset-password-response-contract';

@Injectable()
export class ResetPasswordProxyService {

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  public resetPassword(
    resetPasswordRequestContract: ResetPasswordRequestContract
  ): Observable<ResetPasswordResponseContract> {
    return this._httpClient.post<ResetPasswordResponseContract>(
      `${environment.api_path}/reset-password`,
      resetPasswordRequestContract
    ).pipe(
      map((resetPasswordResponseContract: ResetPasswordResponseContract) => resetPasswordResponseContract),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse)),
    )
  }
}

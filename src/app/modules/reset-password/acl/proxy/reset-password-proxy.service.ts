import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment.development';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { NewPasswordRequestContract } from '../../../../shared/model/contracts/request/new-password/new-password-request-contract';
import { ValidateCodeRequestContract } from '../../../../shared/model/contracts/request/validate-code/validate-code-request-contract';
import { NewPasswordResponseContract } from '../../../../shared/model/contracts/response/new-password/new-password-response-contract';

@Injectable()
export class ResetPasswordProxyService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public sendCodeToEmail(
    sendCodeRequestContract: SendCodeRequestContract
  ): Observable<void> {
    return this._httpClient.post<void>(
      `${environment.api_path}/send-code`,
      sendCodeRequestContract
    ).pipe(
      map(() => {}),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }

  public validateCode(
    validateCodeRequestContract: ValidateCodeRequestContract
  ): Observable<void> {
    return this._httpClient.post<void>(
      `${environment.api_path}/validate-code`,
      validateCodeRequestContract
    ).pipe(
      map(() => {}),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }

  public createNewPassword(
    newPasswordRequestContract: NewPasswordRequestContract
  ): Observable<NewPasswordResponseContract> {
    return this._httpClient.post<NewPasswordResponseContract>(
      `${environment.api_path}/create-new-password`,
      newPasswordRequestContract
    ).pipe(
      map((newPasswordResponseContract: NewPasswordResponseContract) => newPasswordResponseContract),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

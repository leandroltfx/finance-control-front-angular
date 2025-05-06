import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment.development';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { SendCodeResponseContract } from '../../../../shared/model/contracts/response/send-code/send-code-response-contract';
import { ValidateCodeRequestContract } from '../../../../shared/model/contracts/request/validate-code/validate-code-request-contract';
import { ValidateCodeResponseContract } from '../../../../shared/model/contracts/response/validate-code/validate-code-response-contract';

@Injectable()
export class ResetPasswordProxyService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public sendCodeToEmail(
    sendCodeRequestContract: SendCodeRequestContract
  ): Observable<SendCodeResponseContract> {
    return this._httpClient.post<SendCodeResponseContract>(
      `${environment.api_path}/send-code`,
      sendCodeRequestContract
    ).pipe(
      map((sendCodeResponseContract: SendCodeResponseContract) => sendCodeResponseContract),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }

  public validateCode(
    validateCodeRequestContract: ValidateCodeRequestContract
  ): Observable<ValidateCodeResponseContract> {
    return this._httpClient.post<ValidateCodeResponseContract>(
      `${environment.api_path}/validate-code`,
      validateCodeRequestContract
    ).pipe(
      map((validateCodeResponseContract: ValidateCodeResponseContract) => validateCodeResponseContract),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

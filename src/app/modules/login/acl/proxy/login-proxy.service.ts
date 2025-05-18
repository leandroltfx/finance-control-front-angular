import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment.development';
import { LoginRequestContract } from '../../../../shared/model/contracts/request/login/login-request-contract';
import { LoginResponseContract } from '../../../../shared/model/contracts/response/login/login-response-contract';

@Injectable()
export class LoginProxyService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public login(
    loginRequestContract: LoginRequestContract
  ): Observable<LoginResponseContract> {
    return this._httpClient.post<LoginResponseContract>(
      `${environment.api_path}/login`,
      loginRequestContract
    ).pipe(
      map((loginResponseContract: LoginResponseContract) => {
        console.log(loginResponseContract);
        return loginResponseContract;
      }),
      catchError((httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        return throwError(() => httpErrorResponse);
      })
    );
  }
}

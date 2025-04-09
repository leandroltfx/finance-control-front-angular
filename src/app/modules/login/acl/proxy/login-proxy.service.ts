import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { LoginRequestContract } from '../../models/contracts/request/login-request-contract';
import { LoginResponseContract } from '../../models/contracts/response/login-response-contract';

@Injectable()
export class LoginProxyService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public login(
    loginRequestContract: LoginRequestContract,
  ): Observable<LoginResponseContract> {
    return this._httpClient.post<LoginResponseContract>(
      `${environment.api_path}/login`,
      loginRequestContract
    ).pipe(
      map((loginResponseContract: LoginResponseContract) => loginResponseContract),
      catchError((httpErroResponse: HttpErrorResponse) => throwError(() => httpErroResponse)),
    );
  }
}

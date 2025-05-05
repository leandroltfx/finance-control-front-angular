import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment.development';
import { LoginResponseContract } from '../../../../shared/model/contracts/response/login/login-response-contract';
import { UserRegistrationRequestContract } from '../../../../shared/model/contracts/request/user-registration/user-registration-request-contract';

@Injectable()
export class UserRegistrationProxyService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public registerUser(
    userRegistrationRequestContract: UserRegistrationRequestContract
  ): Observable<LoginResponseContract> {
    return this._httpClient.post<LoginResponseContract>(
      `${environment.api_path}/user-registration`,
      userRegistrationRequestContract
    ).pipe(
      map((loginResponseContract: LoginResponseContract) => loginResponseContract),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

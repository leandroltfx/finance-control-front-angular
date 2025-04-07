import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { LoginResponseContract } from '../../../../modules/login/models/contracts/response/login-response-contract';
import { UserRegistrationRequestContract } from '../../models/contracts/request/user-registration-request-contract';

@Injectable()
export class UserRegistrationProxyService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public registerUser(
    userRegistrationRequestContract: UserRegistrationRequestContract,
  ): Observable<LoginResponseContract> {
    return this._httpClient.post<LoginResponseContract>(
      `${environment.api_path}/user-registration`,
      userRegistrationRequestContract
    ).pipe(
      map((loginResponseContract: LoginResponseContract) => loginResponseContract),
      catchError((httpErroResponse: HttpErrorResponse) => throwError(() => httpErroResponse)),
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { UserRegistrationRequestContract } from '../../domain/contracts/request/user-registration-request.contract';
import { UserRegistrationResponseContract } from '../../domain/contracts/response/user-registration-response.contract';

@Injectable()
export class UserProxyService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public registerUser(
    userRegistrationRequestContract: UserRegistrationRequestContract
  ): Observable<UserRegistrationResponseContract> {
    return this._httpClient.post<UserRegistrationResponseContract>(
      'http://localhost:8080/finance-control/api/v1/users',
      userRegistrationRequestContract
    ).pipe(
      map(
        (userRegistrationResponseContract: UserRegistrationResponseContract) => userRegistrationResponseContract
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse)
      )
    );
  }
}

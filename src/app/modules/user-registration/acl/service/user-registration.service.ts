import { HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { LoginDto } from '../../../../shared/model/dto/login/login-dto';
import { UserRegistrationProxyService } from '../proxy/user-registration-proxy.service';
import { UserRegistrationAdapterService } from '../adapter/user-registration-adapter.service';

@Injectable()
export class UserRegistrationService {

  constructor(
    private readonly _userRegistrationProxyService: UserRegistrationProxyService,
    private readonly _userRegistrationAdapterService: UserRegistrationAdapterService
  ) { }

  public registerUser(
    username: string,
    email: string,
    password: string
  ): Observable<LoginDto> {
    return this._userRegistrationProxyService.registerUser(
      this._userRegistrationAdapterService.toRequestContract(
        username,
        email,
        password
      )
    ).pipe(
      map((loginDto: LoginDto) => loginDto),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

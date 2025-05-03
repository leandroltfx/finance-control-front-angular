import { HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { LoginProxyService } from '../proxy/login-proxy.service';
import { LoginAdapterService } from '../adapter/login-adapter.service';
import { LoginDto } from '../../../../shared/model/dto/login/login-dto';

@Injectable()
export class LoginService {

  constructor(
    private readonly _loginProxyService: LoginProxyService,
    private readonly _loginAdapterService: LoginAdapterService
  ) { }

  public login(
    email: string,
    password: string
  ): Observable<LoginDto> {
    return this._loginProxyService.login(
      this._loginAdapterService.toRequestContract(
        email,
        password
      )
    ).pipe(
      map((loginDto: LoginDto) => loginDto),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

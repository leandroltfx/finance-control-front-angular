import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { LoginDto } from '../../models/dto/login-dto';
import { LoginProxyService } from '../proxy/login-proxy.service';
import { LoginAdapterService } from '../adapter/login-adapter.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { LoginResponseContract } from '../../models/contracts/response/login-response-contract';
import { LoggedUserDto } from '../../models/logged-user/logged-user-dto';

@Injectable()
export class LoginService {

  constructor(
    private readonly _authService: AuthService,
    private readonly _loginProxyService: LoginProxyService,
    private readonly _loginAdapterService: LoginAdapterService,
  ) { }

  public login(
    email: string,
    password: string,
  ): Observable<LoginDto> {
    return this._loginProxyService.login(
      this._loginAdapterService.toRequestContract(email, password)
    ).pipe(
      map((loginResponseContract: LoginResponseContract) => {
        const loginDto: LoginDto = this._loginAdapterService.toDto(loginResponseContract);
        this._authService.loggedUser = loginDto.loggedUser;
        return loginDto;
      }),
      catchError((httpErroResponse: HttpErrorResponse) => throwError(() => httpErroResponse)),
    );
  }
}

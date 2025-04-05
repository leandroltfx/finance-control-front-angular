import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { AuthService } from '../../../../core/services/auth/auth.service';
import { LoginDto } from '../../../../features/login/models/dto/login-dto';
import { UserRegistrationProxyService } from '../proxy/user-registration-proxy.service';
import { UserRegistrationAdapterService } from '../adapter/user-registration-adapter.service';
import { LoginResponseContract } from '../../../../features/login/models/contracts/response/login-response-contract';

@Injectable()
export class UserRegistrationService {

  constructor(
    private readonly _authService: AuthService,
    private readonly _userRegistrationProxyService: UserRegistrationProxyService,
    private readonly _userRegistrationAdapterService: UserRegistrationAdapterService,
  ) { }

  public registerUser(
    username: string,
    email: string,
    password: string,
  ): Observable<LoginDto> {
    return this._userRegistrationProxyService.registerUser(
      this._userRegistrationAdapterService.toRequestContract(username, email, password)
    ).pipe(
      map((loginResponseContract: LoginResponseContract) => {
        const loginDto: LoginDto = this._userRegistrationAdapterService.toDto(loginResponseContract);
        this._authService.loggedUser = loginDto.loggedUser;
        return loginDto;
      }),
      catchError((httpErroResponse: HttpErrorResponse) => throwError(() => httpErroResponse)),
    );
  }
}

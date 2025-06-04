import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { UserProxyService } from '../proxy/user-proxy.service';
import { UserAdapterService } from '../adapter/user-adapter.service';
import { UserRegistrationResponseDto } from '../../domain/dto/response/user-registration-response.dto';
import { UserRegistrationResponseContract } from '../../domain/contracts/response/user-registration-response.contract';

@Injectable()
export class UserService {

  constructor(
    private readonly _userProxyService: UserProxyService,
    private readonly _userAdapterService: UserAdapterService
  ) { }

  public registerUser(
    username: string,
    email: string,
    password: string
  ): Observable<UserRegistrationResponseDto> {
    return this._userProxyService.registerUser(
      this._userAdapterService.dataToRequestContract(username, email, password)
    ).pipe(
      map(
        (userRegistrationResponseContract: UserRegistrationResponseContract) => 
          this._userAdapterService.responseContractToDto(userRegistrationResponseContract)
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse) => 
          throwError(() => httpErrorResponse)
      )
    )
  }
}

import { Injectable } from '@angular/core';

import { LoginDto } from '../../models/dto/login-dto';
import { LoggedUserDto } from '../../models/logged-user/logged-user-dto';
import { LoginRequestContract } from '../../models/contracts/request/login-request-contract';
import { LoginResponseContract } from '../../models/contracts/response/login-response-contract';

@Injectable()
export class LoginAdapterService {

  constructor() { }

  public toDto(
    loginResponseContract: LoginResponseContract,
  ): LoginDto {
    return new LoginDto(
      loginResponseContract.message,
      new LoggedUserDto(
        loginResponseContract.loggedUser.id,
        loginResponseContract.loggedUser.userName,
        loginResponseContract.loggedUser.email,
      ),
    );
  }

  public toRequestContract(
    email: string,
    password: string,
  ): LoginRequestContract {
    return new LoginRequestContract(
      email,
      password,
    );
  }
}

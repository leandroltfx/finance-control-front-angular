import { Injectable } from '@angular/core';

import { LoginDto } from '../../../../features/login/models/dto/login-dto';
import { LoggedUserDto } from '../../../../features/login/models/logged-user/logged-user-dto';
import { UserRegistrationRequestContract } from '../../models/contracts/request/user-registration-request-contract';
import { LoginResponseContract } from '../../../../features/login/models/contracts/response/login-response-contract';

@Injectable()
export class UserRegistrationAdapterService {

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
    username: string,
    email: string,
    password: string,
  ): UserRegistrationRequestContract {
    return new UserRegistrationRequestContract(
      username,
      email,
      password,
    );
  }
}

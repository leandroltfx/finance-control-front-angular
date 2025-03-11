import { Injectable } from '@angular/core';

import { LoginDto } from '../../../../modules/login/models/dto/login-dto';
import { LoggedUserDto } from '../../../../modules/login/models/logged-user/logged-user-dto';
import { LoginResponseContract } from '../../../../modules/login/models/contracts/response/login-response-contract';
import { UserRegistrationRequestContract } from '../../models/contracts/request/user-registration-request-contract';

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

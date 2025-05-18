import { Injectable } from '@angular/core';

import { LoginDto } from '../../../../shared/model/dto/login/login-dto';
import { LoginResponseContract } from '../../../../shared/model/contracts/response/login/login-response-contract';
import { UserRegistrationRequestContract } from '../../../../shared/model/contracts/request/user-registration/user-registration-request-contract';

@Injectable()
export class UserRegistrationAdapterService {

  constructor() { }

  public toRequestContract(
    username: string,
    email: string,
    password: string
  ): UserRegistrationRequestContract {
    return new UserRegistrationRequestContract(username, email, password);
  }

  public toDto(
    loginResponseContract: LoginResponseContract
  ): LoginDto {
    return new LoginDto(
      loginResponseContract.messages,
      loginResponseContract.loggedUser
    );
  }
}

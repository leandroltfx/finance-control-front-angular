import { Injectable } from '@angular/core';

import { LoginDto } from '../../../../shared/model/dto/login/login-dto';
import { LoginRequestContract } from '../../../../shared/model/contracts/request/login/login-request-contract';
import { LoginResponseContract } from '../../../../shared/model/contracts/response/login/login-response-contract';

@Injectable()
export class LoginAdapterService {

  constructor() { }

  public toRequestContract(
    email: string,
    password: string
  ): LoginRequestContract {
    return new LoginRequestContract(email, password);
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

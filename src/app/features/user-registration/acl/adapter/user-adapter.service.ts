import { Injectable } from '@angular/core';

import { UserRegistrationResponseDto } from '../../domain/dto/response/user-registration-response.dto';
import { UserRegistrationRequestContract } from '../../domain/contracts/request/user-registration-request.contract';
import { UserRegistrationResponseContract } from '../../domain/contracts/response/user-registration-response.contract';

@Injectable()
export class UserAdapterService {

  constructor() { }

  public responseContractToDto(
    userRegistrationResponseContract: UserRegistrationResponseContract
  ): UserRegistrationResponseDto {
    return {
      message: userRegistrationResponseContract.message
    }
  }

  public dataToRequestContract(
    username: string,
    email: string,
    password: string
  ): UserRegistrationRequestContract {
    return {
      username,
      email,
      password
    }
  }
}

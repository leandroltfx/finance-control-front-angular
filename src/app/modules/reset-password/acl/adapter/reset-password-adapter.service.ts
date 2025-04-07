import { Injectable } from '@angular/core';

import { ResetPasswordDto } from '../../models/dto/reset-password-dto';
import { ResetPasswordRequestContract } from '../../models/contracts/request/reset-password-request-contract';
import { ResetPasswordResponseContract } from '../../models/contracts/response/reset-password-response-contract';

@Injectable()
export class ResetPasswordAdapterService {

  constructor() { }

  public toDto(
    resetPasswordResponseContract: ResetPasswordResponseContract
  ): ResetPasswordDto {
    return new ResetPasswordDto(
      resetPasswordResponseContract.message
    );
  }

  public toRequestContract(
    email: string
  ): ResetPasswordRequestContract {
    return new ResetPasswordRequestContract(
      email
    );
  }
}

import { Injectable } from '@angular/core';

import { ResetPasswordDto } from '../../../../shared/model/dto/reset-password/reset-password-dto';
import { ResetPasswordRequestContract } from '../../../../shared/model/contracts/request/reset-password/reset-password-request-contract';
import { ResetPasswordResponseContract } from '../../../../shared/model/contracts/response/reset-password/reset-password-response-contract';

@Injectable()
export class ResetPasswordAdapterService {

  constructor() { }

  public toRequestContract(
    email: string,
  ): ResetPasswordRequestContract {
    return new ResetPasswordRequestContract(email);
  }

  public toDto(
    resetPasswordResponseContract: ResetPasswordResponseContract
  ): ResetPasswordDto {
    return new ResetPasswordDto(
      resetPasswordResponseContract.message
    );
  }
}

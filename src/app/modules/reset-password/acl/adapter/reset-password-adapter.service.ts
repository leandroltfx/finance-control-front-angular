import { Injectable } from '@angular/core';

import { NewPasswordDto } from '../../../../shared/model/dto/new-password/new-password-dto';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { NewPasswordRequestContract } from '../../../../shared/model/contracts/request/new-password/new-password-request-contract';
import { ValidateCodeRequestContract } from '../../../../shared/model/contracts/request/validate-code/validate-code-request-contract';
import { NewPasswordResponseContract } from '../../../../shared/model/contracts/response/new-password/new-password-response-contract';

@Injectable()
export class ResetPasswordAdapterService {

  constructor() { }

  public toSendCodeRequestContract(
    email: string,
  ): SendCodeRequestContract {
    return new SendCodeRequestContract(email);
  }

  public toValidateCodeRequestContract(
    email: string,
    code: string
  ): ValidateCodeRequestContract {
    return new ValidateCodeRequestContract(
      email,
      code
    );
  }

  public toNewPasswordRequestContract(
    newPassword: string,
    email: string,
    code: string
  ): NewPasswordRequestContract {
    return new NewPasswordRequestContract(
      newPassword,
      email,
      code
    );
  }

  public toNewPasswordDto(
    newPasswordResponseContract: NewPasswordResponseContract
  ): NewPasswordDto {
    return new NewPasswordDto(
      newPasswordResponseContract.message
    );
  }
}

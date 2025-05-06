import { Injectable } from '@angular/core';

import { SendCodeDto } from '../../../../shared/model/dto/send-code/send-code-dto';
import { ValidateCodeDto } from '../../../../shared/model/dto/validate-code/validate-code-dto';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { SendCodeResponseContract } from '../../../../shared/model/contracts/response/send-code/send-code-response-contract';
import { ValidateCodeRequestContract } from '../../../../shared/model/contracts/request/validate-code/validate-code-request-contract';
import { ValidateCodeResponseContract } from '../../../../shared/model/contracts/response/validate-code/validate-code-response-contract';

@Injectable()
export class ResetPasswordAdapterService {

  constructor() { }

  public toSendCodeRequestContract(
    email: string,
  ): SendCodeRequestContract {
    return new SendCodeRequestContract(email);
  }

  public toSendCodeDto(
    sendCodeResponseContract: SendCodeResponseContract
  ): SendCodeDto {
    return new SendCodeDto(
      sendCodeResponseContract.message
    );
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

  public toValidateCodeDto(
    validateCodeResponseContract: ValidateCodeResponseContract
  ): ValidateCodeDto {
    return new ValidateCodeDto(
      validateCodeResponseContract.userId
    );
  }
}

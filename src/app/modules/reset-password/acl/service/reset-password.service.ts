import { HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { SendCodeDto } from '../../../../shared/model/dto/send-code/send-code-dto';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { ValidateCodeDto } from '../../../../shared/model/dto/validate-code/validate-code-dto';

@Injectable()
export class ResetPasswordService {

  constructor(
    private readonly _resetPasswordProxyService: ResetPasswordProxyService,
    private readonly _resetPasswordAdapterService: ResetPasswordAdapterService
  ) { }

  public sendCodeToEmail(
    email: string
  ): Observable<SendCodeDto> {
    return this._resetPasswordProxyService.sendCodeToEmail(
      this._resetPasswordAdapterService.toSendCodeRequestContract(
        email
      )
    ).pipe(
      map((sendCodeDto: SendCodeDto) => sendCodeDto),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }

  public validateCode(
    email: string,
    code: string
  ): Observable<ValidateCodeDto> {
    return this._resetPasswordProxyService.validateCode(
      this._resetPasswordAdapterService.toValidateCodeRequestContract(
        email,
        code
      )
    ).pipe(
      map((validateCodeDto: ValidateCodeDto) => validateCodeDto),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

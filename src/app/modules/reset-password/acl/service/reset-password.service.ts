import { HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { NewPasswordDto } from '../../../../shared/model/dto/new-password/new-password-dto';

@Injectable()
export class ResetPasswordService {

  constructor(
    private readonly _resetPasswordProxyService: ResetPasswordProxyService,
    private readonly _resetPasswordAdapterService: ResetPasswordAdapterService
  ) { }

  public sendCodeToEmail(
    email: string
  ): Observable<any> {
    return this._resetPasswordProxyService.sendCodeToEmail(
      this._resetPasswordAdapterService.toSendCodeRequestContract(
        email
      )
    ).pipe(
      map(() => {}),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }

  public validateCode(
    email: string,
    code: string
  ): Observable<void> {
    return this._resetPasswordProxyService.validateCode(
      this._resetPasswordAdapterService.toValidateCodeRequestContract(
        email,
        code
      )
    ).pipe(
      map(() => {}),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }

  public createNewPassword(
    newPassword: string,
    email: string,
    code: string
  ): Observable<NewPasswordDto> {
    return this._resetPasswordProxyService.createNewPassword(
      this._resetPasswordAdapterService.toNewPasswordRequestContract(
        newPassword,
        email,
        code
      )
    ).pipe(
      map((newPasswordDto: NewPasswordDto) => newPasswordDto),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

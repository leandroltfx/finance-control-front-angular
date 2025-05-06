import { HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { SendCodeDto } from '../../../../shared/model/dto/send-code/send-code-dto';

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
      this._resetPasswordAdapterService.toRequestContract(
        email
      )
    ).pipe(
      map((sendCodeDto: SendCodeDto) => sendCodeDto),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

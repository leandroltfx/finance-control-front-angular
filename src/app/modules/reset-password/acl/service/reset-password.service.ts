import { HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { ResetPasswordDto } from '../../../../shared/model/dto/reset-password/reset-password-dto';

@Injectable()
export class ResetPasswordService {

  constructor(
    private readonly _resetPasswordProxyService: ResetPasswordProxyService,
    private readonly _resetPasswordAdapterService: ResetPasswordAdapterService
  ) { }

  public sendCodeToEmail(
    email: string
  ): Observable<ResetPasswordDto> {
    return this._resetPasswordProxyService.sendCodeToEmail(
      this._resetPasswordAdapterService.toRequestContract(
        email
      )
    ).pipe(
      map((resetPasswordDto: ResetPasswordDto) => resetPasswordDto),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { ResetPasswordDto } from '../../models/dto/reset-password-dto';
import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { ResetPasswordResponseContract } from '../../models/contracts/response/reset-password-response-contract';

@Injectable()
export class ResetPasswordService {

  constructor(
    private readonly _resetPasswordProxyService: ResetPasswordProxyService,
    private readonly _resetPasswordAdapterService: ResetPasswordAdapterService,
  ) { }

  public resetPassword(
    email: string
  ): Observable<ResetPasswordDto> {
    return this._resetPasswordProxyService.resetPassword(
      this._resetPasswordAdapterService.toRequestContract(email)
    ).pipe(
      map((resetPasswordResponseContract: ResetPasswordResponseContract) => this._resetPasswordAdapterService.toDto(resetPasswordResponseContract)),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse)),
    );
  }
}

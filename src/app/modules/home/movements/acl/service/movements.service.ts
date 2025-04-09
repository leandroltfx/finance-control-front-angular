import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { MovementDto } from '../../models/dto/movement-dto';
import { MovementsProxyService } from '../proxy/movements-proxy.service';
import { MovementsAdapterService } from '../adapter/movements-adapter.service';
import { MovementsResponseContract } from '../../models/contracts/response/movements-response-contract';

@Injectable()
export class MovementsService {

  constructor(
    private readonly _movementsProxyService: MovementsProxyService,
    private readonly _movementsAdapterService: MovementsAdapterService
  ) { }

  public getMovements(
    userId: string | undefined
  ): Observable<MovementDto[]> {

    if (!userId) {
      return throwError(() => new Error('userId não informado.'));
    }

    return this._movementsProxyService.getMovements(
      this._movementsAdapterService.toRequestContract(userId)
    ).pipe(
      map((movementsResponseContract: MovementsResponseContract) => this._movementsAdapterService.toDto(movementsResponseContract)),
      catchError((httpErroResponse: HttpErrorResponse) => throwError(() => httpErroResponse)),
    );
  }
}

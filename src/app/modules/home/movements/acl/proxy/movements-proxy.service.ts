import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../../environments/environment';
import { MovementsRequestContract } from '../../models/contracts/request/movements-request-contract';
import { MovementsResponseContract } from '../../models/contracts/response/movements-response-contract';

@Injectable()
export class MovementsProxyService {

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  getMovements(
    movementsRequestContract: MovementsRequestContract
  ): Observable<MovementsResponseContract> {
    return this._httpClient.get<MovementsResponseContract>(
      `${environment.api_path}/movements/${movementsRequestContract.userId}`
    ).pipe(
      map((movementsResponseContract: MovementsResponseContract) => movementsResponseContract),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse)),
    );
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovementsProxyService } from './movements-proxy.service';
import { environment } from '../../../../../../environments/environment';
import { MovementsRequestContract } from '../../models/contracts/request/movements-request-contract';
import { MovementsResponseContract } from '../../models/contracts/response/movements-response-contract';

describe('MovementsProxyService', () => {
  let service: MovementsProxyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        MovementsProxyService
      ],
    });
    service = TestBed.inject(MovementsProxyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovements', () => {

    afterEach(() => {
      httpTestingController.verify();
    });

    it('deve realizar uma chamada HTTP GET para a listagem de movimentações', () => {

      const movementsRequestContract: MovementsRequestContract = new MovementsRequestContract('userId');
      const movementsResponseContract: MovementsResponseContract = new MovementsResponseContract([]);

      service.getMovements(movementsRequestContract).subscribe(
        {
          next: response => expect(response).toEqual(movementsResponseContract)
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/movements/userId`);
      expect(req.request.method).toBe('GET');
      req.flush(movementsResponseContract);
    });

    it('deve capturar e lançar o erro HTTP em caso de falha na listagem de movimentações', () => {

      const movementsRequestContract: MovementsRequestContract = new MovementsRequestContract('userId');
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro na listagem das movimentações.' } });

      service.getMovements(movementsRequestContract).subscribe(
        {
          next: () => { },
          error: error => {
            expect(error).toBeInstanceOf(HttpErrorResponse);
            expect(error.status).toBe(500);
            expect(error.statusText).toBe('Internal Server Error');
            expect(error.error.error.message).toBe('Ocorreu um erro na listagem das movimentações.');
          }
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/movements/userId`);
      expect(req.request.method).toBe('GET');
      req.flush(httpErrorResponse, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});

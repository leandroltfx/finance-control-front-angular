import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { MovementsService } from './movements.service';
import { MovementsProxyService } from '../proxy/movements-proxy.service';
import { MovementsAdapterService } from '../adapter/movements-adapter.service';
import { MovementsResponseContract } from '../../models/contracts/response/movements-response-contract';

describe('MovementsService', () => {
  let service: MovementsService;
  let movementsProxyServiceSpy: jasmine.SpyObj<MovementsProxyService>;
  let movementsAdapterServiceSpy: jasmine.SpyObj<MovementsAdapterService>;

  beforeEach(() => {

    movementsProxyServiceSpy = jasmine.createSpyObj<MovementsProxyService>('MovementsProxyService', ['getMovements']);
    movementsAdapterServiceSpy = jasmine.createSpyObj<MovementsAdapterService>('MovementsAdapterService', ['toDto', 'toRequestContract']);

    TestBed.configureTestingModule({
      providers: [
        MovementsService,
        { provide: MovementsProxyService, useValue: movementsProxyServiceSpy },
        { provide: MovementsAdapterService, useValue: movementsAdapterServiceSpy },
      ]
    });
    service = TestBed.inject(MovementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovements', () => {

    it('deve chamar o proxy para realizar a requisição HTTP e o adapter para tratar a resposta', () => {

      const movementsResponseContract: MovementsResponseContract = new MovementsResponseContract(
        []
      );

      movementsProxyServiceSpy.getMovements.and.returnValue(of(movementsResponseContract));

      service.getMovements('userId').subscribe(
        {
          next: () => {
            expect(movementsAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith('userId');
            expect(movementsAdapterServiceSpy.toDto).toHaveBeenCalledWith(movementsResponseContract);
            expect(movementsProxyServiceSpy.getMovements).toHaveBeenCalled();
          }
        }
      );
    });

    it('não deve chamar o proxy se não houver userId passado por parâmetro', () => {
      service.getMovements('').subscribe(
        {
          next: () => { },
          error: (error) => {
            expect(error).toBeInstanceOf(Error);
            expect(movementsAdapterServiceSpy.toRequestContract).not.toHaveBeenCalled();
            expect(movementsAdapterServiceSpy.toDto).not.toHaveBeenCalled();
            expect(movementsProxyServiceSpy.getMovements).not.toHaveBeenCalled();
          }
        }
      );

    });

    it('deve capturar e lançar o erro HTTP em caso de falha na redefinição de senha no proxy', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});

      movementsProxyServiceSpy.getMovements.and.returnValue(throwError(() => httpErrorResponse));

      service.getMovements('userId').subscribe(
        {
          next: () => { },
          error: (error) => {
            expect(error).toBeInstanceOf(HttpErrorResponse);
          }
        }
      );
    });
  });
});

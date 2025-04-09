import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { MovementDto } from '../../models/dto/movement-dto';
import { MovementsAdapterService } from './movements-adapter.service';
import { MovementsRequestContract } from '../../models/contracts/request/movements-request-contract';
import { MovementsResponseContract } from '../../models/contracts/response/movements-response-contract';

registerLocaleData(localePt);

describe('MovementsAdapterService', () => {
  let service: MovementsAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovementsAdapterService,
        { provide: LOCALE_ID, useValue: 'pt-BR' }
      ]
    });
    service = TestBed.inject(MovementsAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toDto', () => {
    it('deve transformar um contrato de resposta listagem de movimentações em dto', () => {

      const movementsResponseContract: MovementsResponseContract = new MovementsResponseContract(
        [
          {
            id: 'id',
            registerDate: '01.01.2025',
            bankAccount: 'bank',
            category: 'category',
            description: 'description',
            value: 0,
          }
        ]
      );

      const movementDto: MovementDto[] = service.toDto(movementsResponseContract);

      expect(movementDto instanceof Array).toBeTrue();
    });
  });

  describe('toRequestContract', () => {

    it('deve montar um contrato de requisição para listagem de movimentações', () => {

      const movementsRequestContract: MovementsRequestContract = service.toRequestContract('userId');

      expect(movementsRequestContract instanceof MovementsRequestContract).toBeTrue();
      expect(movementsRequestContract.userId).toBe('userId');
    });
  });
});

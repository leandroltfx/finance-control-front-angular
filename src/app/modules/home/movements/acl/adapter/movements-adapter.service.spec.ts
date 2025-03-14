import { TestBed } from '@angular/core/testing';

import { MovementDto } from '../../models/dto/movement-dto';
import { MovementsAdapterService } from './movements-adapter.service';
import { MovementsResponseContract } from '../../models/contracts/response/movements-response-contract';
import { MovementsRequestContract } from '../../models/contracts/request/movements-request-contract';

describe('MovementsAdapterService', () => {
  let service: MovementsAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovementsAdapterService
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

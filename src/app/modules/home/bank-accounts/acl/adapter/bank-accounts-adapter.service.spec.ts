import { TestBed } from '@angular/core/testing';

import { BankAccountsDto } from '../../models/dto/bank-accounts-dto';
import { BankAccountsAdapterService } from './bank-accounts-adapter.service';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';
import { BankAccountsRequestContract } from '../../models/contracts/request/bank-accounts-request-contract';

describe('BankAccountsAdapterService', () => {
  let service: BankAccountsAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BankAccountsAdapterService,
      ]
    });
    service = TestBed.inject(BankAccountsAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    describe('toDto', () => {
      it('deve transformar um contrato de resposta listagem de contas bancárias em dto', () => {
  
        const bankAccountsResponseContract: BankAccountsResponseContract = new BankAccountsResponseContract([]);
  
        const bankAccountsDto = service.toDto(bankAccountsResponseContract);
  
        expect(bankAccountsDto instanceof BankAccountsDto).toBeTrue();
        expect(bankAccountsDto.bankAccounts instanceof Array).toBeTrue();
      });
    });
  
    describe('toRequestContract', () => {
  
      it('deve montar um contrato de requisição para listagem de contas bancárias', () => {
  
        const bankAccountsRequestContract: BankAccountsRequestContract = service.toRequestContract('userId');
  
        expect(bankAccountsRequestContract instanceof BankAccountsRequestContract).toBeTrue();
        expect(bankAccountsRequestContract.userId).toBe('userId');
      });
    });
});

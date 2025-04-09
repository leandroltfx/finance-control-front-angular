import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { BankAccountDto } from '../../models/dto/bank-account-dto';
import { BankAccountsAdapterService } from './bank-accounts-adapter.service';
import { BankAccountsRequestContract } from '../../models/contracts/request/bank-accounts-request-contract';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';

registerLocaleData(localePt);

describe('BankAccountsAdapterService', () => {
  let service: BankAccountsAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BankAccountsAdapterService,
        { provide: LOCALE_ID, useValue: 'pt-BR' }
      ]
    });
    service = TestBed.inject(BankAccountsAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toDto', () => {
    it('deve transformar um contrato de resposta listagem de contas bancárias em dto', () => {

      const bankAccountsResponseContract: BankAccountsResponseContract = new BankAccountsResponseContract(
        [
          {
            id: 'id',
            institution: 'bank',
            nickname: '',
            balance: 0,
          }
        ]
      );

      const bankAccountDto: BankAccountDto[] = service.toDto(bankAccountsResponseContract);

      expect(bankAccountDto instanceof Array).toBeTrue();
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

import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsProxyService } from '../proxy/bank-accounts-proxy.service';
import { BankAccountsAdapterService } from '../adapter/bank-accounts-adapter.service';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';

describe('BankAccountsService', () => {
  let service: BankAccountsService;
  let bankAccountsProxyServiceSpy: jasmine.SpyObj<BankAccountsProxyService>;
  let bankAccountsAdapterServiceSpy: jasmine.SpyObj<BankAccountsAdapterService>;

  beforeEach(() => {

    bankAccountsProxyServiceSpy = jasmine.createSpyObj<BankAccountsProxyService>('BankAccountsProxyService', ['getBankAccounts']);
    bankAccountsAdapterServiceSpy = jasmine.createSpyObj<BankAccountsAdapterService>('BankAccountsAdapterService', ['toDto', 'toRequestContract']);

    TestBed.configureTestingModule({
      providers: [
        BankAccountsService,
        { provide: BankAccountsProxyService, useValue: bankAccountsProxyServiceSpy },
        { provide: BankAccountsAdapterService, useValue: bankAccountsAdapterServiceSpy },
      ]
    });
    service = TestBed.inject(BankAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBankAccounts', () => {

    it('deve chamar o proxy para realizar a requisição HTTP e o adapter para tratar a resposta', () => {

      const bankAccountsResponseContract: BankAccountsResponseContract = new BankAccountsResponseContract(
        []
      );

      bankAccountsProxyServiceSpy.getBankAccounts.and.returnValue(of(bankAccountsResponseContract));

      service.getBankAccounts('userId').subscribe(
        {
          next: () => {
            expect(bankAccountsAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith('userId');
            expect(bankAccountsAdapterServiceSpy.toDto).toHaveBeenCalledWith(bankAccountsResponseContract);
            expect(bankAccountsProxyServiceSpy.getBankAccounts).toHaveBeenCalled();
          }
        }
      );
    });

    it('não deve chamar o proxy se não houver userId passado por parâmetro', () => {
      service.getBankAccounts('').subscribe(
        {
          next: () => { },
          error: (error) => {
            expect(error).toBeInstanceOf(Error);
            expect(bankAccountsAdapterServiceSpy.toRequestContract).not.toHaveBeenCalled();
            expect(bankAccountsAdapterServiceSpy.toDto).not.toHaveBeenCalled();
            expect(bankAccountsProxyServiceSpy.getBankAccounts).not.toHaveBeenCalled();
          }
        }
      );

    });

    it('deve capturar e lançar o erro HTTP em caso de falha na redefinição de senha no proxy', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});

      bankAccountsProxyServiceSpy.getBankAccounts.and.returnValue(throwError(() => httpErrorResponse));

      service.getBankAccounts('userId').subscribe(
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

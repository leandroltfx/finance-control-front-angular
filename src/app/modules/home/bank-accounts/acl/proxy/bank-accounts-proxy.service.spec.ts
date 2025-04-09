import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../../../../environments/environment';
import { BankAccountsProxyService } from './bank-accounts-proxy.service';
import { BankAccountsRequestContract } from '../../models/contracts/request/bank-accounts-request-contract';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';

describe('BankAccountsProxyService', () => {
  let service: BankAccountsProxyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BankAccountsProxyService
      ]
    });
    service = TestBed.inject(BankAccountsProxyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBankAccounts', () => {

    afterEach(() => {
      httpTestingController.verify();
    });

    it('deve realizar uma chamada HTTP GET para a listagem de contas bancárias', () => {

      const bankAccountsRequestContract: BankAccountsRequestContract = new BankAccountsRequestContract('userId');
      const bankAccountsResponseContract: BankAccountsResponseContract = new BankAccountsResponseContract([]);

      service.getBankAccounts(bankAccountsRequestContract).subscribe(
        {
          next: response => expect(response).toEqual(bankAccountsResponseContract)
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/bank-accounts/userId`);
      expect(req.request.method).toBe('GET');
      req.flush(bankAccountsResponseContract);
    });

    it('deve capturar e lançar o erro HTTP em caso de falha na listagem de contas bancárias', () => {

      const bankAccountsRequestContract: BankAccountsRequestContract = new BankAccountsRequestContract('userId');
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro na listagem das contas bancárias.' } });

      service.getBankAccounts(bankAccountsRequestContract).subscribe(
        {
          next: () => { },
          error: error => {
            expect(error).toBeInstanceOf(HttpErrorResponse);
            expect(error.status).toBe(500);
            expect(error.statusText).toBe('Internal Server Error');
            expect(error.error.error.message).toBe('Ocorreu um erro na listagem das contas bancárias.');
          }
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/bank-accounts/userId`);
      expect(req.request.method).toBe('GET');
      req.flush(httpErrorResponse, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});

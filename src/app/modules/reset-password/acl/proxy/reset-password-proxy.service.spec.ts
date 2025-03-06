import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ResetPasswordProxyService } from './reset-password-proxy.service';
import { ResetPasswordRequestContract } from '../../models/contracts/request/reset-password-request-contract';
import { ResetPasswordResponseContract } from '../../models/contracts/response/reset-password-response-contract';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('ResetPasswordProxyService', () => {
  let service: ResetPasswordProxyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ResetPasswordProxyService,
      ]
    });
    service = TestBed.inject(ResetPasswordProxyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resetPassword', () => {

    afterEach(() => {
      httpTestingController.verify();
    });

    it('deve realizar uma chamada HTTP POST para a redefinição de senha', () => {

      const resetPasswordRequestContract: ResetPasswordRequestContract = new ResetPasswordRequestContract('email');
      const resetPasswordResponseContract: ResetPasswordResponseContract = new ResetPasswordResponseContract('message');

      service.resetPassword(resetPasswordRequestContract).subscribe(
        {
          next: response => expect(response).toEqual(resetPasswordResponseContract)
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/reset-password`);
      expect(req.request.method).toBe('POST');
      req.flush(resetPasswordResponseContract);
    });

    it('deve capturar e lançar o erro HTTP em caso de falha no login', () => {

      const resetPasswordRequestContract: ResetPasswordRequestContract = new ResetPasswordRequestContract('email');
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro na redefinição de senha, tente novamente.' } });

      service.resetPassword(resetPasswordRequestContract).subscribe(
        {
          next: () => { },
          error: error => {
            expect(error).toBeInstanceOf(HttpErrorResponse);
            expect(error.status).toBe(500);
            expect(error.statusText).toBe('Internal Server Error');
            expect(error.error.error.message).toBe('Ocorreu um erro na redefinição de senha, tente novamente.');
          }
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/reset-password`);
      expect(req.request.method).toBe('POST');
      req.flush(httpErrorResponse, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});

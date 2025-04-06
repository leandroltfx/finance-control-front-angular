import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { ResetPasswordResponseContract } from '../../models/contracts/response/reset-password-response-contract';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let resetPasswordProxyServiceSpy: jasmine.SpyObj<ResetPasswordProxyService>;
  let resetPasswordAdapterServiceSpy: jasmine.SpyObj<ResetPasswordAdapterService>;

  beforeEach(() => {

    resetPasswordProxyServiceSpy = jasmine.createSpyObj<ResetPasswordProxyService>('ResetPasswordProxyService', ['sendCode']);
    resetPasswordAdapterServiceSpy = jasmine.createSpyObj<ResetPasswordAdapterService>('ResetPasswordAdapterService', ['toDto', 'toRequestContract']);

    TestBed.configureTestingModule({
      providers: [
        ResetPasswordService,
        { provide: ResetPasswordProxyService, useValue: resetPasswordProxyServiceSpy },
        { provide: ResetPasswordAdapterService, useValue: resetPasswordAdapterServiceSpy },
      ]
    });
    service = TestBed.inject(ResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendCode', () => {

    it('deve chamar o proxy para realizar a requisição HTTP e o adapter para tratar a resposta', () => {

      const resetPasswordResponseContract: ResetPasswordResponseContract = new ResetPasswordResponseContract(
        'message'
      );

      resetPasswordProxyServiceSpy.sendCode.and.returnValue(of(resetPasswordResponseContract));

      service.sendCode('email@email.com').subscribe(
        {
          next: () => {
            expect(resetPasswordAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith('email@email.com');
            expect(resetPasswordAdapterServiceSpy.toDto).toHaveBeenCalledWith(resetPasswordResponseContract);
            expect(resetPasswordProxyServiceSpy.sendCode).toHaveBeenCalled();
          }
        }
      );
    });

    it('deve capturar e lançar o erro HTTP em caso de falha na redefinição de senha no proxy', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});

      resetPasswordProxyServiceSpy.sendCode.and.returnValue(throwError(() => httpErrorResponse));

      service.sendCode('email@email.com').subscribe(
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

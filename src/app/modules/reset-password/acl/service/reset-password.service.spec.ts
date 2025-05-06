import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { SendCodeDto } from '../../../../shared/model/dto/send-code/send-code-dto';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let resetPasswordProxyServiceSpy: jasmine.SpyObj<ResetPasswordProxyService>;
  let resetPasswordAdapterServiceSpy: jasmine.SpyObj<ResetPasswordAdapterService>;

  beforeEach(() => {
    resetPasswordProxyServiceSpy = jasmine.createSpyObj<ResetPasswordProxyService>('ResetPasswordProxyService', ['sendCodeToEmail']);
    resetPasswordAdapterServiceSpy = jasmine.createSpyObj<ResetPasswordAdapterService>('ResetPasswordAdapterService', ['toRequestContract']);

    TestBed.configureTestingModule({
      providers: [
        ResetPasswordService,
        { provide: ResetPasswordProxyService, useValue: resetPasswordProxyServiceSpy },
        { provide: ResetPasswordAdapterService, useValue: resetPasswordAdapterServiceSpy },
      ],
    });

    service = TestBed.inject(ResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendCodeToEmail', () => {

    it('deve chamar o serviço de envio de código no proxy montando antes a requisição através do adapter', (done) => {

      const email = 'email';
      const sendCodeDto: SendCodeDto = { message: 'Código enviado com sucesso!' };
      const sendCodeRequestContract = new SendCodeRequestContract('email');
      resetPasswordAdapterServiceSpy.toRequestContract.and.returnValue(sendCodeRequestContract);
      resetPasswordProxyServiceSpy.sendCodeToEmail.and.returnValue(of(sendCodeDto));

      service.sendCodeToEmail(email).subscribe({
        next: (result) => {
          expect(result).toEqual(sendCodeDto);
          expect(resetPasswordAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(email);
          expect(resetPasswordProxyServiceSpy.sendCodeToEmail).toHaveBeenCalledWith(sendCodeRequestContract);
          done();
        },
        error: () => done(),
      });
    });

    it('deve capturar e lançar o erro do serviço de envio de código no proxy', (done) => {

      const email = 'email';
      const sendCodeRequestContract = new SendCodeRequestContract(email);
      const httpErrorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
      resetPasswordAdapterServiceSpy.toRequestContract.and.returnValue(sendCodeRequestContract);
      resetPasswordProxyServiceSpy.sendCodeToEmail.and.returnValue(throwError(() => httpErrorResponse));

      service.sendCodeToEmail(email).subscribe({
        next: () => done(),
        error: (error) => {
          expect(error).toEqual(httpErrorResponse);
          expect(resetPasswordAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(email);
          expect(resetPasswordProxyServiceSpy.sendCodeToEmail).toHaveBeenCalledWith(sendCodeRequestContract);
          done();
        },
      });
    });
  });
});

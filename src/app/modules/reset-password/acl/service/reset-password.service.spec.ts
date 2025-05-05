import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordDto } from 'src/app/shared/model/dto/reset-password/reset-password-dto';
import { ResetPasswordRequestContract } from 'src/app/shared/model/contracts/request/reset-password/reset-password-request-contract';
import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { HttpErrorResponse } from '@angular/common/http';

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

    it('deve chamar o serviço de redefinição de senha no proxy montando antes a requisição através do adapter', (done) => {

      const email = 'email';
      const resetPasswordDto: ResetPasswordDto = { message: 'Código enviado com sucesso!' };
      const resetPasswordRequestContract = new ResetPasswordRequestContract(email);
      resetPasswordAdapterServiceSpy.toRequestContract.and.returnValue(resetPasswordRequestContract);
      resetPasswordProxyServiceSpy.sendCodeToEmail.and.returnValue(of(resetPasswordDto));

      service.sendCodeToEmail(email).subscribe({
        next: (result) => {
          expect(result).toEqual(resetPasswordDto);
          expect(resetPasswordAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(email);
          expect(resetPasswordProxyServiceSpy.sendCodeToEmail).toHaveBeenCalledWith(resetPasswordRequestContract);
          done();
        },
        error: () => done(),
      });
    });

    it('deve capturar e lançar o erro do serviço de redefinição de senha no proxy', (done) => {

      const email = 'email';
      const requestContract = new ResetPasswordRequestContract(email);
      const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
      resetPasswordAdapterServiceSpy.toRequestContract.and.returnValue(requestContract);
      resetPasswordProxyServiceSpy.sendCodeToEmail.and.returnValue(throwError(() => errorResponse));

      service.sendCodeToEmail(email).subscribe({
        next: () => done(),
        error: (error) => {
          expect(error).toEqual(errorResponse);
          expect(resetPasswordAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(email);
          expect(resetPasswordProxyServiceSpy.sendCodeToEmail).toHaveBeenCalledWith(requestContract);
          done();
        },
      });
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordProxyService } from '../proxy/reset-password-proxy.service';
import { ResetPasswordAdapterService } from '../adapter/reset-password-adapter.service';
import { NewPasswordDto } from '../../../../shared/model/dto/new-password/new-password-dto';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { NewPasswordRequestContract } from '../../../../shared/model/contracts/request/new-password/new-password-request-contract';
import { ValidateCodeRequestContract } from '../../../../shared/model/contracts/request/validate-code/validate-code-request-contract';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let resetPasswordProxyServiceSpy: jasmine.SpyObj<ResetPasswordProxyService>;
  let resetPasswordAdapterServiceSpy: jasmine.SpyObj<ResetPasswordAdapterService>;

  beforeEach(() => {
    resetPasswordProxyServiceSpy = jasmine.createSpyObj<ResetPasswordProxyService>('ResetPasswordProxyService', ['sendCodeToEmail', 'validateCode', 'createNewPassword']);
    resetPasswordAdapterServiceSpy = jasmine.createSpyObj<ResetPasswordAdapterService>('ResetPasswordAdapterService', ['toSendCodeRequestContract', 'toValidateCodeRequestContract', 'toNewPasswordRequestContract']);

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
      const sendCodeRequestContract = new SendCodeRequestContract('email');
      resetPasswordAdapterServiceSpy.toSendCodeRequestContract.and.returnValue(sendCodeRequestContract);
      resetPasswordProxyServiceSpy.sendCodeToEmail.and.returnValue(of(undefined));

      service.sendCodeToEmail(email).subscribe({
        next: () => {
          expect(resetPasswordAdapterServiceSpy.toSendCodeRequestContract).toHaveBeenCalledWith(email);
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
      resetPasswordAdapterServiceSpy.toSendCodeRequestContract.and.returnValue(sendCodeRequestContract);
      resetPasswordProxyServiceSpy.sendCodeToEmail.and.returnValue(throwError(() => httpErrorResponse));

      service.sendCodeToEmail(email).subscribe({
        next: () => done(),
        error: (error) => {
          expect(error).toEqual(httpErrorResponse);
          expect(resetPasswordAdapterServiceSpy.toSendCodeRequestContract).toHaveBeenCalledWith(email);
          expect(resetPasswordProxyServiceSpy.sendCodeToEmail).toHaveBeenCalledWith(sendCodeRequestContract);
          done();
        },
      });
    });
  });

  describe('validateCode', () => {

    it('deve chamar o serviço de validação de código no proxy montando antes a requisição através do adapter', (done) => {

      const validateCodeRequestContract = new ValidateCodeRequestContract('email', 'code');
      resetPasswordAdapterServiceSpy.toValidateCodeRequestContract.and.returnValue(validateCodeRequestContract);
      resetPasswordProxyServiceSpy.validateCode.and.returnValue(of(undefined));

      service.validateCode('email', 'code').subscribe({
        next: () => {
          expect(resetPasswordAdapterServiceSpy.toValidateCodeRequestContract).toHaveBeenCalledWith('email', 'code');
          expect(resetPasswordProxyServiceSpy.validateCode).toHaveBeenCalledWith(validateCodeRequestContract);
          done();
        },
        error: () => done(),
      });
    });

    it('deve capturar e lançar o erro do serviço de validação de código no proxy', (done) => {

      const validateCodeRequestContract = new ValidateCodeRequestContract('email', 'code');
      const httpErrorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
      resetPasswordAdapterServiceSpy.toValidateCodeRequestContract.and.returnValue(validateCodeRequestContract);
      resetPasswordProxyServiceSpy.validateCode.and.returnValue(throwError(() => httpErrorResponse));

      service.validateCode('email', 'code').subscribe({
        next: () => done(),
        error: (error) => {
          expect(error).toEqual(httpErrorResponse);
          expect(resetPasswordAdapterServiceSpy.toValidateCodeRequestContract).toHaveBeenCalledWith('email', 'code');
          expect(resetPasswordProxyServiceSpy.validateCode).toHaveBeenCalledWith(validateCodeRequestContract);
          done();
        },
      });
    });
  });

  describe('createNewPassword', () => {

    it('deve chamar o serviço de cadastro de nova senha no proxy montando antes a requisição através do adapter', (done) => {

      const newPasswordDto: NewPasswordDto = { message: 'message' };
      const newPasswordRequestContract = new NewPasswordRequestContract('newPassword', 'email@email.com', '123456');
      resetPasswordAdapterServiceSpy.toNewPasswordRequestContract.and.returnValue(newPasswordRequestContract);
      resetPasswordProxyServiceSpy.createNewPassword.and.returnValue(of(newPasswordDto));

      service.createNewPassword('newPassword', 'email@email.com', '123456').subscribe({
        next: (result) => {
          expect(result).toEqual(newPasswordDto);
          expect(resetPasswordAdapterServiceSpy.toNewPasswordRequestContract).toHaveBeenCalledWith('newPassword', 'email@email.com', '123456');
          expect(resetPasswordProxyServiceSpy.createNewPassword).toHaveBeenCalledWith(newPasswordRequestContract);
          done();
        },
        error: () => done(),
      });
    });

    it('deve capturar e lançar o erro do serviço de cadastro de nova senha no proxy', (done) => {

      const newPasswordRequestContract = new NewPasswordRequestContract('newPassword', 'email@email.com', '123456');
      const httpErrorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
      resetPasswordAdapterServiceSpy.toNewPasswordRequestContract.and.returnValue(newPasswordRequestContract);
      resetPasswordProxyServiceSpy.createNewPassword.and.returnValue(throwError(() => httpErrorResponse));

      service.createNewPassword('newPassword', 'email@email.com', '123456').subscribe({
        next: () => done(),
        error: (error) => {
          expect(error).toEqual(httpErrorResponse);
          expect(resetPasswordAdapterServiceSpy.toNewPasswordRequestContract).toHaveBeenCalledWith('newPassword', 'email@email.com', '123456');
          expect(resetPasswordProxyServiceSpy.createNewPassword).toHaveBeenCalledWith(newPasswordRequestContract);
          done();
        },
      });
    });
  });
});

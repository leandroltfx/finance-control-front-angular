import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ResetPasswordProxyService } from './reset-password-proxy.service';
import { environment } from '../../../../../environments/environment.development';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { NewPasswordRequestContract } from '../../../../shared/model/contracts/request/new-password/new-password-request-contract';
import { NewPasswordResponseContract } from '../../../../shared/model/contracts/response/new-password/new-password-response-contract';
import { ValidateCodeRequestContract } from '../../../../shared/model/contracts/request/validate-code/validate-code-request-contract';
import { ValidateCodeResponseContract } from '../../../../shared/model/contracts/response/validate-code/validate-code-response-contract';

describe('ResetPasswordProxyService', () => {
  let service: ResetPasswordProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ResetPasswordProxyService
      ]
    });
    service = TestBed.inject(ResetPasswordProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendCodeToEmail', () => {

    it('deve realizar uma chamada para o endpoint de redefinição de senha através do método POST', () => {
      const mockRequest: SendCodeRequestContract = { email: 'email' };

      service.sendCodeToEmail(mockRequest).subscribe((response) => {
        expect(response).toEqual();
      });

      const req = httpMock.expectOne(`${environment.api_path}/send-code`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush({});
    });

    it('deve tratar erro na chamada do endpoint de redefinição de senha', () => {
      const mockRequest: SendCodeRequestContract = { email: 'email' };
      const mockError = { status: 401, statusText: 'Unauthorized' };

      service.sendCodeToEmail(mockRequest).subscribe({
        next: () => { },
        error: (error) => {
          expect(error.status).toBe(401);
          expect(error.statusText).toBe('Unauthorized');
        }
      });

      const req = httpMock.expectOne(`${environment.api_path}/send-code`);
      req.flush(null, mockError);
    });
  });

  describe('validateCode', () => {

    it('deve realizar uma chamada para o endpoint de validação de código através do método POST', () => {
      const mockRequest: ValidateCodeRequestContract = { email: 'email@email.com', code: '123456' };
      const mockResponse: ValidateCodeResponseContract = { userId: 'userid' };

      service.validateCode(mockRequest).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.api_path}/validate-code`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });

    it('deve tratar erro na chamada do endpoint de validação de código', () => {
      const mockRequest: ValidateCodeRequestContract = { email: 'email@email.com', code: '123456' };
      const mockError = { status: 401, statusText: 'Unauthorized' };

      service.validateCode(mockRequest).subscribe({
        next: () => { },
        error: (error) => {
          expect(error.status).toBe(401);
          expect(error.statusText).toBe('Unauthorized');
        }
      });

      const req = httpMock.expectOne(`${environment.api_path}/validate-code`);
      req.flush(null, mockError);
    });
  });

  describe('createNewPassword', () => {

    it('deve realizar uma chamada para o endpoint de cadastro de nova senha através do método POST', () => {
      const mockRequest: NewPasswordRequestContract = { newPassword: 'newPassword', email: 'email@email.com' };
      const mockResponse: NewPasswordResponseContract = { message: 'message' };

      service.createNewPassword(mockRequest).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.api_path}/create-new-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });

    it('deve tratar erro na chamada do endpoint de cadastro de nova senha', () => {
      const mockRequest: NewPasswordRequestContract = { newPassword: 'newPassword', email: 'email@email.com' };
      const mockError = { status: 401, statusText: 'Unauthorized' };

      service.createNewPassword(mockRequest).subscribe({
        next: () => { },
        error: (error) => {
          expect(error.status).toBe(401);
          expect(error.statusText).toBe('Unauthorized');
        }
      });

      const req = httpMock.expectOne(`${environment.api_path}/create-new-password`);
      req.flush(null, mockError);
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ResetPasswordProxyService } from './reset-password-proxy.service';
import { environment } from '../../../../../environments/environment.development';
import { ResetPasswordRequestContract } from '../../../../shared/model/contracts/request/reset-password/reset-password-request-contract';
import { ResetPasswordResponseContract } from '../../../../shared/model/contracts/response/reset-password/reset-password-response-contract';

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
      const mockRequest: ResetPasswordRequestContract = { email: 'email' };
      const mockResponse: ResetPasswordResponseContract = { message: 'Código enviado com sucesso!' };

      service.sendCodeToEmail(mockRequest).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.api_path}/reset-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });

    it('deve tratar erro na chamada do endpoint de redefinição de senha', () => {
      const mockRequest: ResetPasswordRequestContract = { email: 'email' };
      const mockError = { status: 401, statusText: 'Unauthorized' };

      service.sendCodeToEmail(mockRequest).subscribe({
        next: () => { },
        error: (error) => {
          expect(error.status).toBe(401);
          expect(error.statusText).toBe('Unauthorized');
        }
      });

      const req = httpMock.expectOne(`${environment.api_path}/reset-password`);
      req.flush(null, mockError);
    });
  });
});

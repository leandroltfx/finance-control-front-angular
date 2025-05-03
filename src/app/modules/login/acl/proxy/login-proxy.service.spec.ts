import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { LoginProxyService } from './login-proxy.service';
import { environment } from '../../../../../environments/environment.development';
import { LoggedUserDto } from '../../../../shared/model/dto/logged-user/logged-user-dto';
import { LoginRequestContract } from '../../../../shared/model/contracts/request/login/login-request-contract';
import { LoginResponseContract } from '../../../../shared/model/contracts/response/login/login-response-contract';

describe('LoginProxyService', () => {
  let service: LoginProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoginProxyService
      ]
    });
    service = TestBed.inject(LoginProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {

    it('deve realizar uma chamada para o endpoint login através do método POST', () => {
      const mockRequest: LoginRequestContract = { email: 'email', password: 'password' };
      const mockResponse: LoginResponseContract = { message: 'Login efetuado com sucesso!', loggedUser: new LoggedUserDto('id', 'username', 'email') };

      service.login(mockRequest).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.api_path}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });

    it('deve tratar erro na chamada do endpoint de login', () => {
      const mockRequest: LoginRequestContract = { email: 'email', password: 'password' };
      const mockError = { status: 401, statusText: 'Unauthorized' };

      service.login(mockRequest).subscribe({
        next: () => {},
        error: (error) => {
          expect(error.status).toBe(401);
          expect(error.statusText).toBe('Unauthorized');
        }
      });

      const req = httpMock.expectOne(`${environment.api_path}/login`);
      req.flush(null, mockError);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginProxyService } from './login-proxy.service';
import { environment } from '../../../../../environments/environment';
import { LoginRequestContract } from '../../models/contracts/request/login-request-contract';
import { LoggedUserResponseContract, LoginResponseContract } from '../../models/contracts/response/login-response-contract';

describe('LoginProxyService', () => {
  let service: LoginProxyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoginProxyService,
      ]
    });
    service = TestBed.inject(LoginProxyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {

    afterEach(() => {
      httpTestingController.verify();
    });

    it('deve realizar uma chamada HTTP POST para o login', () => {

      const loginRequestContract: LoginRequestContract = new LoginRequestContract('email', 'password');
      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Login efetuado com sucesso!', new LoggedUserResponseContract('userName', 'email'));

      service.login(loginRequestContract).subscribe(
        {
          next: response => expect(response).toEqual(loginResponseContract)
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(loginResponseContract);
    });

    it('deve capturar e lançar o erro HTTP em caso de falha no login', () => {

      const loginRequestContract: LoginRequestContract = new LoginRequestContract('email', 'password');
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro durante o login, tente novamente.' } });

      service.login(loginRequestContract).subscribe(
        {
          next: () => {},
          error: error => {
            expect(error).toBeInstanceOf(HttpErrorResponse);
            expect(error.status).toBe(500);
            expect(error.statusText).toBe('Internal Server Error');
            expect(error.error.error.message).toBe('Ocorreu um erro durante o login, tente novamente.');
          }
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(httpErrorResponse, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});

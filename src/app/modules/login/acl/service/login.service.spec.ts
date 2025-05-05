import { HttpErrorResponse } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { LoginService } from './login.service';
import { LoginProxyService } from '../proxy/login-proxy.service';
import { LoginAdapterService } from '../adapter/login-adapter.service';
import { LoginDto } from '../../../../shared/model/dto/login/login-dto';
import { LoggedUserDto } from '../../../../shared/model/dto/logged-user/logged-user-dto';
import { LoginRequestContract } from '../../../../shared/model/contracts/request/login/login-request-contract';

describe('LoginService', () => {
  let service: LoginService;
  let loginProxyServiceSpy: jasmine.SpyObj<LoginProxyService>;
  let loginAdapterServiceSpy: jasmine.SpyObj<LoginAdapterService>;

  beforeEach(() => {
    loginProxyServiceSpy = jasmine.createSpyObj<LoginProxyService>('LoginProxyService', ['login']);
    loginAdapterServiceSpy = jasmine.createSpyObj<LoginAdapterService>('LoginAdapterService', ['toRequestContract']);

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: LoginProxyService, useValue: loginProxyServiceSpy },
        { provide: LoginAdapterService, useValue: loginAdapterServiceSpy },
      ],
    });

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {

    it('deve chamar o serviço de login no proxy montando antes a requisição através do adapter', (done) => {

      const email = 'email';
      const password = 'password';
      const loginDto: LoginDto = { message: 'Login efetuado com sucesso!', loggedUser: new LoggedUserDto('id', 'username', 'email') };
      const loginRequestContract = new LoginRequestContract(email, password);
      loginAdapterServiceSpy.toRequestContract.and.returnValue(loginRequestContract);
      loginProxyServiceSpy.login.and.returnValue(of(loginDto));

      service.login(email, password).subscribe({
        next: (result) => {
          expect(result).toEqual(loginDto);
          expect(loginAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(email, password);
          expect(loginProxyServiceSpy.login).toHaveBeenCalledWith(loginRequestContract);
          done();
        },
        error: () => done(),
      });
    });

    it('deve capturar e lançar o erro do serviço de login no proxy', (done) => {

      const email = 'email';
      const password = 'password';
      const requestContract = new LoginRequestContract(email, password);
      const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
      loginAdapterServiceSpy.toRequestContract.and.returnValue(requestContract);
      loginProxyServiceSpy.login.and.returnValue(throwError(() => errorResponse));

      service.login(email, password).subscribe({
        next: () => done(),
        error: (error) => {
          expect(error).toEqual(errorResponse);
          expect(loginAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(email, password);
          expect(loginProxyServiceSpy.login).toHaveBeenCalledWith(requestContract);
          done();
        },
      });
    });
  });
});

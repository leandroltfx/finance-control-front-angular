import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { LoginService } from './login.service';
import { LoginDto } from '../../models/dto/login-dto';
import { LoginProxyService } from '../proxy/login-proxy.service';
import { LoginAdapterService } from '../adapter/login-adapter.service';
import { LoggedUserDto } from '../../models/logged-user/logged-user-dto';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { LoggedUserResponseContract, LoginResponseContract } from '../../models/contracts/response/login-response-contract';

describe('LoginService', () => {
  let service: LoginService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let loginProxyServiceSpy: jasmine.SpyObj<LoginProxyService>;
  let loginAdapterServiceSpy: jasmine.SpyObj<LoginAdapterService>;

  beforeEach(() => {

    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['loggedUser']);
    loginProxyServiceSpy = jasmine.createSpyObj<LoginProxyService>('LoginProxyService', ['login']);
    loginAdapterServiceSpy = jasmine.createSpyObj<LoginAdapterService>('LoginAdapterService', ['toDto', 'toRequestContract']);

    Object.defineProperty(authServiceSpy, 'loggedUser', {
      get: () => authServiceSpy['_loggedUser'],
      set: (loggedUser: LoggedUserDto | null) => authServiceSpy['_loggedUser'] = loggedUser,
    });
    authServiceSpy['_loggedUser'] = null;

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: LoginProxyService, useValue: loginProxyServiceSpy },
        { provide: LoginAdapterService, useValue: loginAdapterServiceSpy },
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('deve chamar o proxy para realizar a requisição HTTP e o adapter para tratar a resposta', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract(
        'message',
        new LoggedUserResponseContract(
          '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          'userName',
          'email',
        )
      );
      loginProxyServiceSpy.login.and.returnValue(of(loginResponseContract));

      const loginDto: LoginDto = new LoginDto('message', new LoggedUserDto('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'userName', 'email'));
      loginAdapterServiceSpy.toDto.and.returnValue(loginDto);

      service.login('email', 'password').subscribe(
        {
          next: () => {
            expect(loginAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith('email', 'password');
            expect(loginAdapterServiceSpy.toDto).toHaveBeenCalledWith(loginResponseContract);
            expect(loginProxyServiceSpy.login).toHaveBeenCalled();
            expect(authServiceSpy.loggedUser?.email).toBe('email');
            expect(authServiceSpy.loggedUser?.userName).toBe('userName');
          }
        }
      );
    });

    it('deve capturar e lançar o erro HTTP em caso de falha no login no proxy', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});

      loginProxyServiceSpy.login.and.returnValue(throwError(() => httpErrorResponse));

      service.login('email', 'password').subscribe(
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

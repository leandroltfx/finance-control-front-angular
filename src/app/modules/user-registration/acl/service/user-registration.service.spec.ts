import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { UserRegistrationService } from './user-registration.service';
import { LoginDto } from '../../../../modules/login/models/dto/login-dto';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserRegistrationProxyService } from '../proxy/user-registration-proxy.service';
import { LoggedUserDto } from '../../../../modules/login/models/logged-user/logged-user-dto';
import { UserRegistrationAdapterService } from '../adapter/user-registration-adapter.service';
import { LoggedUserResponseContract, LoginResponseContract } from '../../../../modules/login/models/contracts/response/login-response-contract';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userRegistrationProxyServiceSpy: jasmine.SpyObj<UserRegistrationProxyService>;
  let userRegistrationAdapterServiceSpy: jasmine.SpyObj<UserRegistrationAdapterService>;

  beforeEach(() => {

    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['loggedUser']);
    userRegistrationProxyServiceSpy = jasmine.createSpyObj<UserRegistrationProxyService>('UserRegistrationProxyService', ['registerUser']);
    userRegistrationAdapterServiceSpy = jasmine.createSpyObj<UserRegistrationAdapterService>('UserRegistrationAdapterService', ['toDto', 'toRequestContract']);

    Object.defineProperty(authServiceSpy, 'loggedUser', {
      get: () => authServiceSpy['_loggedUser'],
      set: (loggedUser: LoggedUserDto | null) => authServiceSpy['_loggedUser'] = loggedUser,
    });
    authServiceSpy['_loggedUser'] = null;

    TestBed.configureTestingModule({
      providers: [
        UserRegistrationService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserRegistrationProxyService, useValue: userRegistrationProxyServiceSpy },
        { provide: UserRegistrationAdapterService, useValue: userRegistrationAdapterServiceSpy },
      ]
    });
    service = TestBed.inject(UserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {
    it('deve chamar o proxy para realizar a requisição HTTP e o adapter para tratar a resposta', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract(
        'message',
        new LoggedUserResponseContract(
          '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          'userName',
          'email',
        )
      );
      userRegistrationProxyServiceSpy.registerUser.and.returnValue(of(loginResponseContract));

      const loginDto: LoginDto = new LoginDto('message', new LoggedUserDto('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'userName', 'email'));
      userRegistrationAdapterServiceSpy.toDto.and.returnValue(loginDto);

      service.registerUser('username', 'email', 'password').subscribe(
        {
          next: () => {
            expect(userRegistrationAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith('username', 'email', 'password');
            expect(userRegistrationAdapterServiceSpy.toDto).toHaveBeenCalledWith(loginResponseContract);
            expect(userRegistrationProxyServiceSpy.registerUser).toHaveBeenCalled();
            expect(authServiceSpy.loggedUser?.email).toBe('email');
            expect(authServiceSpy.loggedUser?.userName).toBe('userName');
          }
        }
      );
    });

    it('deve capturar e lançar o erro HTTP em caso de falha no cadastro de usuário no proxy', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});

      userRegistrationProxyServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

      service.registerUser('username', 'email', 'password').subscribe(
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

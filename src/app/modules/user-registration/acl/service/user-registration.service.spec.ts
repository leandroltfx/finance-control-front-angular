import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationProxyService } from '../proxy/user-registration-proxy.service';
import { UserRegistrationAdapterService } from '../adapter/user-registration-adapter.service';
import { LoggedUserResponseContract, LoginResponseContract } from '../../../../modules/login/models/contracts/response/login-response-contract';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let loginProxyServiceSpy: jasmine.SpyObj<UserRegistrationProxyService>;
  let loginAdapterServiceSpy: jasmine.SpyObj<UserRegistrationAdapterService>;

  beforeEach(() => {

    loginProxyServiceSpy = jasmine.createSpyObj<UserRegistrationProxyService>('UserRegistrationProxyService', ['registerUser']);
    loginAdapterServiceSpy = jasmine.createSpyObj<UserRegistrationAdapterService>('UserRegistrationAdapterService', ['toDto', 'toRequestContract']);

    TestBed.configureTestingModule({
      providers: [
        UserRegistrationService,
        { provide: UserRegistrationProxyService, useValue: loginProxyServiceSpy },
        { provide: UserRegistrationAdapterService, useValue: loginAdapterServiceSpy },
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
          'userName',
          'email',
        )
      );

      loginProxyServiceSpy.registerUser.and.returnValue(of(loginResponseContract));

      service.registerUser('username', 'email', 'password').subscribe(
        {
          next: () => {
            expect(loginAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith('username', 'email', 'password');
            expect(loginAdapterServiceSpy.toDto).toHaveBeenCalledWith(loginResponseContract);
            expect(loginProxyServiceSpy.registerUser).toHaveBeenCalled();
          }
        }
      );
    });

    it('deve capturar e lançar o erro HTTP em caso de falha no cadastro de usuário no proxy', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});

      loginProxyServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

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

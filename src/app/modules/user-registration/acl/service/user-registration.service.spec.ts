import { HttpErrorResponse } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { UserRegistrationService } from './user-registration.service';
import { LoginDto } from '../../../../shared/model/dto/login/login-dto';
import { UserRegistrationProxyService } from '../proxy/user-registration-proxy.service';
import { LoggedUserDto } from '../../../../shared/model/dto/logged-user/logged-user-dto';
import { UserRegistrationAdapterService } from '../adapter/user-registration-adapter.service';
import { UserRegistrationRequestContract } from '../../../../shared/model/contracts/request/user-registration/user-registration-request-contract';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let userRegistrationProxyServiceSpy: jasmine.SpyObj<UserRegistrationProxyService>;
  let userRegistrationAdapterServiceSpy: jasmine.SpyObj<UserRegistrationAdapterService>;

  beforeEach(() => {
    userRegistrationProxyServiceSpy = jasmine.createSpyObj<UserRegistrationProxyService>('UserRegistrationProxyService', ['registerUser']);
    userRegistrationAdapterServiceSpy = jasmine.createSpyObj<UserRegistrationAdapterService>('UserRegistrationAdapterService', ['toRequestContract']);

    TestBed.configureTestingModule({
      providers: [
        UserRegistrationService,
        { provide: UserRegistrationProxyService, useValue: userRegistrationProxyServiceSpy },
        { provide: UserRegistrationAdapterService, useValue: userRegistrationAdapterServiceSpy },
      ],
    });

    service = TestBed.inject(UserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {

    it('deve chamar o serviço de cadastro de usuário no proxy montando antes a requisição através do adapter', (done) => {

      const username = 'username';
      const email = 'email';
      const password = 'password';
      const loginDto: LoginDto = { message: 'Cadastro efetuado com sucesso!', loggedUser: new LoggedUserDto('id', 'username', 'email') };
      const userRegistrationRequestContract = new UserRegistrationRequestContract(username, email, password);
      userRegistrationAdapterServiceSpy.toRequestContract.and.returnValue(userRegistrationRequestContract);
      userRegistrationProxyServiceSpy.registerUser.and.returnValue(of(loginDto));

      service.registerUser(username, email, password).subscribe({
        next: (result) => {
          expect(result).toEqual(loginDto);
          expect(userRegistrationAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(username, email, password);
          expect(userRegistrationProxyServiceSpy.registerUser).toHaveBeenCalledWith(userRegistrationRequestContract);
          done();
        },
        error: () => done(),
      });
    });

    it('deve capturar e lançar o erro do serviço de cadastro de usuário no proxy', (done) => {

      const username = 'username';
      const email = 'email';
      const password = 'password';
      const requestContract = new UserRegistrationRequestContract(username, email, password);
      const errorResponse = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
      userRegistrationAdapterServiceSpy.toRequestContract.and.returnValue(requestContract);
      userRegistrationProxyServiceSpy.registerUser.and.returnValue(throwError(() => errorResponse));

      service.registerUser(username, email, password).subscribe({
        next: () => done(),
        error: (error) => {
          expect(error).toEqual(errorResponse);
          expect(userRegistrationAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(username, email, password);
          expect(userRegistrationProxyServiceSpy.registerUser).toHaveBeenCalledWith(requestContract);
          done();
        },
      });
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { UserService } from './user.service';
import { UserProxyService } from '../proxy/user-proxy.service';
import { UserAdapterService } from '../adapter/user-adapter.service';
import { UserRegistrationResponseDto } from '../../domain/dto/response/user-registration-response.dto';
import { UserRegistrationRequestContract } from '../../domain/contracts/request/user-registration-request.contract';
import { UserRegistrationResponseContract } from '../../domain/contracts/response/user-registration-response.contract';

describe('UserService', () => {
  let service: UserService;
  let userAdapterServiceSpy: jasmine.SpyObj<UserAdapterService>;
  let userProxyServiceSpy: jasmine.SpyObj<UserProxyService>;

  beforeEach(() => {

    userAdapterServiceSpy = jasmine.createSpyObj<UserAdapterService>(['dataToRequestContract', 'responseContractToDto']);
    userProxyServiceSpy = jasmine.createSpyObj<UserProxyService>(['registerUser']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: UserAdapterService, useValue: userAdapterServiceSpy },
        { provide: UserProxyService, useValue: userProxyServiceSpy }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {

    it('deve montar o payload do cadastro de usuário e chamar o proxy', () => {

      const userRegistrationResponseContract: UserRegistrationResponseContract = {
        message: 'Usuário cadastrado com sucesso!',
        data: null
      };
      userProxyServiceSpy.registerUser.and.returnValue(of(userRegistrationResponseContract));

      const userRegistrationRequestContract: UserRegistrationRequestContract = {
        username: 'admin',
        email: 'admin@email.com',
        password: 'admin123'
      };
      userAdapterServiceSpy.dataToRequestContract.and.returnValue(userRegistrationRequestContract);

      const userRegistrationResponseDto: UserRegistrationResponseDto = {
        message: 'Usuário cadastrado com sucesso!',
      };
      userAdapterServiceSpy.responseContractToDto.and.returnValue(userRegistrationResponseDto);

      service.registerUser(
        'admin',
        'admin@email.com',
        'admin123'
      ).subscribe(
        {
          next: (response) => {
            expect(userAdapterServiceSpy.dataToRequestContract).toHaveBeenCalledWith('admin', 'admin@email.com', 'admin123');
            expect(userProxyServiceSpy.registerUser).toHaveBeenCalledWith(userRegistrationRequestContract);
            expect(userAdapterServiceSpy.responseContractToDto).toHaveBeenCalledWith(userRegistrationResponseContract);
            expect(response.message).toBe('Usuário cadastrado com sucesso!');
            expect(Object.keys(response).length).toBe(1);
          }
        }
      );
    });

    it('deve tratar erro após chamar o proxy', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse(
        {
          error: {
            message: 'Ocorreu um erro inesperado, tente novamente mais tarde.'
          }
        }
      );
      userProxyServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

      service.registerUser(
        'admin',
        'admin@email.com',
        'admin123'
      ).subscribe(
        {
          next: () => { },
          error: (httpErrorResponse) => {
            expect(httpErrorResponse instanceof HttpErrorResponse);
            expect(httpErrorResponse.error.message).toBe('Ocorreu um erro inesperado, tente novamente mais tarde.');
          }
        }
      );

    });

  });
});

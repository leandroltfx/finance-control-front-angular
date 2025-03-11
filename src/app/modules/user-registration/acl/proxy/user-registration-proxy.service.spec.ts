import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../../../environments/environment';
import { UserRegistrationProxyService } from './user-registration-proxy.service';
import { UserRegistrationRequestContract } from '../../models/contracts/request/user-registration-request-contract';
import { LoggedUserResponseContract, LoginResponseContract } from '../../../../modules/login/models/contracts/response/login-response-contract';

describe('UserRegistrationProxyService', () => {
  let service: UserRegistrationProxyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserRegistrationProxyService,
      ]
    });
    service = TestBed.inject(UserRegistrationProxyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {

    afterEach(() => {
      httpTestingController.verify();
    });

    it('deve realizar uma chamada HTTP POST para o cadastro de usuário', () => {

      const userRegistrationRequestContract: UserRegistrationRequestContract = new UserRegistrationRequestContract('username', 'email', 'password');
      const loginResponseContract: LoginResponseContract = new LoginResponseContract('Cadastro realizado com sucesso!', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'userName', 'email'));

      service.registerUser(userRegistrationRequestContract).subscribe(
        {
          next: response => expect(response).toEqual(loginResponseContract)
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/user-registration`);
      expect(req.request.method).toBe('POST');
      req.flush(loginResponseContract);
    });

    it('deve capturar e lançar o erro HTTP em caso de falha no cadastro de usuário', () => {

      const userRegistrationRequestContract: UserRegistrationRequestContract = new UserRegistrationRequestContract('username', 'email', 'password');
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro durante o cadastro, tente novamente.' } });

      service.registerUser(userRegistrationRequestContract).subscribe(
        {
          next: () => { },
          error: error => {
            expect(error).toBeInstanceOf(HttpErrorResponse);
            expect(error.status).toBe(500);
            expect(error.statusText).toBe('Internal Server Error');
            expect(error.error.error.message).toBe('Ocorreu um erro durante o cadastro, tente novamente.');
          }
        }
      );

      const req = httpTestingController.expectOne(`${environment.api_path}/user-registration`);
      expect(req.request.method).toBe('POST');
      req.flush(httpErrorResponse, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});

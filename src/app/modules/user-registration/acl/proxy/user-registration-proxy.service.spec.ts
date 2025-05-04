import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { UserRegistrationProxyService } from './user-registration-proxy.service';
import { environment } from '../../../../../environments/environment.development';
import { LoggedUserDto } from '../../../../shared/model/dto/logged-user/logged-user-dto';
import { LoginResponseContract } from '../../../../shared/model/contracts/response/login/login-response-contract';
import { UserRegistrationRequestContract } from '../../../../shared/model/contracts/request/user-registration/user-registration-request-contract';

describe('UserRegistrationProxyService', () => {
  let service: UserRegistrationProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserRegistrationProxyService
      ]
    });
    service = TestBed.inject(UserRegistrationProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {

    it('deve realizar uma chamada para o endpoint de cadastro de usuário através do método POST', () => {
      const mockRequest: UserRegistrationRequestContract = { username: 'username', email: 'email', password: 'password' };
      const mockResponse: LoginResponseContract = { message: 'Cadastro efetuado com sucesso!', loggedUser: new LoggedUserDto('id', 'username', 'email') };

      service.registerUser(mockRequest).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.api_path}/user-registration`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });

    it('deve tratar erro na chamada do endpoint de cadastro de usuário', () => {
      const mockRequest: UserRegistrationRequestContract = { username: 'username', email: 'email', password: 'password' };
      const mockError = { status: 401, statusText: 'Unauthorized' };

      service.registerUser(mockRequest).subscribe({
        next: () => { },
        error: (error) => {
          expect(error.status).toBe(401);
          expect(error.statusText).toBe('Unauthorized');
        }
      });

      const req = httpMock.expectOne(`${environment.api_path}/user-registration`);
      req.flush(null, mockError);
    });
  });
});

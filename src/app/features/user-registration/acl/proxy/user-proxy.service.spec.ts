import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserProxyService } from './user-proxy.service';
import { UserRegistrationRequestContract } from '../../domain/contracts/request/user-registration-request.contract';
import { UserRegistrationResponseContract } from '../../domain/contracts/response/user-registration-response.contract';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserProxyService', () => {
  let service: UserProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserProxyService
      ]
    });
    service = TestBed.inject(UserProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {

    it('deve chamar a URL correta e retornar a resposta ao registrar o usuário', () => {
      const requestPayload: UserRegistrationRequestContract = {
        username: 'admin',
        email: 'admin@email.com',
        password: 'admin123'
      };

      const mockResponse: UserRegistrationResponseContract = {
        message: '',
        data: null
      };

      service.registerUser(requestPayload).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/finance-control/api/v1/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(requestPayload);
      req.flush(mockResponse);
    });

    it('deve tratar erros HTTP no método registerUser', () => {
      const requestPayload: UserRegistrationRequestContract = {
        username: 'admin',
        email: 'admin@email.com',
        password: 'admin123'
      };

      const mockError = new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: { message: 'Invalid data' }
      });

      service.registerUser(requestPayload).subscribe({
        next: () => { },
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.error.message).toBe('Dados inválidos');
        }
      });

      const req = httpMock.expectOne('http://localhost:8080/finance-control/api/v1/users');
      req.flush({ message: 'Dados inválidos' }, { status: 400, statusText: 'Bad Request' });
    });

  });
});

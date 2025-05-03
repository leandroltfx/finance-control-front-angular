import { TestBed } from '@angular/core/testing';

import { LoginAdapterService } from './login-adapter.service';
import { LoginDto } from '../../../../shared/model/dto/login/login-dto';
import { LoggedUserDto } from '../../../../shared/model/dto/logged-user/logged-user-dto';
import { LoginRequestContract } from '../../../../shared/model/contracts/request/login/login-request-contract';
import { LoginResponseContract } from '../../../../shared/model/contracts/response/login/login-response-contract';

describe('LoginAdapterService', () => {
  let service: LoginAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginAdapterService
      ]
    });
    service = TestBed.inject(LoginAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toRequestContract', () => {

    it('deve montar a requisição do login a partir dos dados do formulário do login', () => {

      const loginRequestContract = service.toRequestContract('email', 'password');

      expect(loginRequestContract instanceof LoginRequestContract).toBeTrue();
      expect(loginRequestContract.email).toBe('email');
      expect(loginRequestContract.password).toBe('password');
    });
  });

  describe('toDto', () => {

    it('deve transformar a resposta de login do backend em dto', () => {

      const loginResponseContract = new LoginResponseContract('message', new LoggedUserDto('id', 'username', 'email'));

      const loginDto = service.toDto(loginResponseContract);

      expect(loginDto instanceof LoginDto).toBeTrue();
      expect(loginDto.message).toBe('message');
      expect(loginDto.loggedUser.id).toBe('id');
      expect(loginDto.loggedUser.email).toBe('email');
      expect(loginDto.loggedUser.username).toBe('username');
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { LoginDto } from '../../models/dto/login-dto';
import { LoginAdapterService } from './login-adapter.service';
import { LoginRequestContract } from '../../models/contracts/request/login-request-contract';
import { LoggedUserResponseContract, LoginResponseContract } from '../../models/contracts/response/login-response-contract';

describe('LoginAdapterService', () => {
  let service: LoginAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginAdapterService,
      ]
    });
    service = TestBed.inject(LoginAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toDto', () => {
    it('deve transformar um contrato de resposta do login em dto de login', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract(
        'Login efetuado com sucesso!',
        new LoggedUserResponseContract(
          'username',
          'email@email.com',
        )
      );

      const loginDto: LoginDto = service.toDto(loginResponseContract);

      expect(loginDto instanceof LoginDto).toBeTrue();
      expect(loginDto.message).toBe('Login efetuado com sucesso!');
      expect(loginDto.loggedUser.userName).toBe('username');
      expect(loginDto.loggedUser.email).toBe('email@email.com');
    });
  });

  describe('toRequestContract', () => {

    it('deve montar um contrato de requisição para o login', () => {

      const loginRequestContract: LoginRequestContract = service.toRequestContract('email@email.com', 'asd123');

      expect(loginRequestContract instanceof LoginRequestContract).toBeTrue();
      expect(loginRequestContract.email).toBe('email@email.com');
      expect(loginRequestContract.password).toBe('asd123');
    });
  });
});

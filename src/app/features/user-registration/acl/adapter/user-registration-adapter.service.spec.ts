import { TestBed } from '@angular/core/testing';

import { LoginDto } from '../../../../features/login/models/dto/login-dto';
import { UserRegistrationAdapterService } from './user-registration-adapter.service';
import { UserRegistrationRequestContract } from '../../models/contracts/request/user-registration-request-contract';
import { LoggedUserResponseContract, LoginResponseContract } from '../../../../features/login/models/contracts/response/login-response-contract';

describe('UserRegistrationAdapterService', () => {
  let service: UserRegistrationAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRegistrationAdapterService
      ]
    });
    service = TestBed.inject(UserRegistrationAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toDto', () => {
    it('deve transformar um contrato de resposta do cadastro de usuário em dto de login', () => {

      const loginResponseContract: LoginResponseContract = new LoginResponseContract(
        'Cadastro realizado com sucesso!',
        new LoggedUserResponseContract(
          '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          'username',
          'email@email.com',
        )
      );

      const loginDto: LoginDto = service.toDto(loginResponseContract);

      expect(loginDto instanceof LoginDto).toBeTrue();
      expect(loginDto.message).toBe('Cadastro realizado com sucesso!');
      expect(loginDto.loggedUser.userName).toBe('username');
      expect(loginDto.loggedUser.email).toBe('email@email.com');
    });
  });

  describe('toRequestContract', () => {

    it('deve montar um contrato de requisição para o cadastro de usuário', () => {

      const userRegistrationRequestContract: UserRegistrationRequestContract = service.toRequestContract('username', 'email@email.com', 'asd123');

      expect(userRegistrationRequestContract instanceof UserRegistrationRequestContract).toBeTrue();
      expect(userRegistrationRequestContract.username).toBe('username');
      expect(userRegistrationRequestContract.email).toBe('email@email.com');
      expect(userRegistrationRequestContract.password).toBe('asd123');
    });
  });
});

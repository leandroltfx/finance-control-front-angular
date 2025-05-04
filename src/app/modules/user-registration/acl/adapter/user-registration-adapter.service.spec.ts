import { TestBed } from '@angular/core/testing';

import { LoginDto } from '../../../../shared/model/dto/login/login-dto';
import { UserRegistrationAdapterService } from './user-registration-adapter.service';
import { LoggedUserDto } from '../../../../shared/model/dto/logged-user/logged-user-dto';
import { LoginResponseContract } from '../../../../shared/model/contracts/response/login/login-response-contract';
import { UserRegistrationRequestContract } from '../../../../shared/model/contracts/request/user-registration/user-registration-request-contract';

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

  describe('toRequestContract', () => {

    it('deve montar a requisição do cadastro de usuário a partir dos dados do formulário do cadastro de usuário', () => {

      const userRegistrationRequestContract = service.toRequestContract('username', 'email', 'password');

      expect(userRegistrationRequestContract instanceof UserRegistrationRequestContract).toBeTrue();
      expect(userRegistrationRequestContract.username).toBe('username');
      expect(userRegistrationRequestContract.email).toBe('email');
      expect(userRegistrationRequestContract.password).toBe('password');
    });
  });

  describe('toDto', () => {

    it('deve transformar a resposta do cadastro de usuário do backend em dto', () => {

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

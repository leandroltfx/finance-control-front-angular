import { TestBed } from '@angular/core/testing';

import { UserAdapterService } from './user-adapter.service';
import { UserRegistrationResponseContract } from '../../domain/contracts/response/user-registration-response.contract';

describe('UserAdapterService', () => {
  let service: UserAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAdapterService
      ]
    });
    service = TestBed.inject(UserAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('responseContractToDomain', () => {

    it('deve transformar o response do cadastro de usuário em dto', () => {

      const userRegistrationResponseContract: UserRegistrationResponseContract = {
        message: 'Usuário cadastrado com sucesso',
        data: null
      };

      const userRegistrationResponseDto = service.responseContractToDto(userRegistrationResponseContract);

      expect(userRegistrationResponseDto.message).toBe('Usuário cadastrado com sucesso');
    });

  });

  describe('dataToRequestContract', () => {

    it('deve transformar os dados do formulário em payload de requisição para o cadastro de usuário', () => {

      const userRegistrationRequestContract = service.dataToRequestContract('username', 'email@email.com', 'asd123asd123');

      expect(userRegistrationRequestContract.username).toBe('username');
      expect(userRegistrationRequestContract.email).toBe('email@email.com');
      expect(userRegistrationRequestContract.password).toBe('asd123asd123');
    });

  });
});

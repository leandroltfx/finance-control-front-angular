import { TestBed } from '@angular/core/testing';

import { ResetPasswordAdapterService } from './reset-password-adapter.service';
import { NewPasswordDto } from '../../../../shared/model/dto/new-password/new-password-dto';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { NewPasswordRequestContract } from '../../../../shared/model/contracts/request/new-password/new-password-request-contract';
import { ValidateCodeRequestContract } from '../../../../shared/model/contracts/request/validate-code/validate-code-request-contract';
import { NewPasswordResponseContract } from '../../../../shared/model/contracts/response/new-password/new-password-response-contract';

describe('ResetPasswordAdapterService', () => {
  let service: ResetPasswordAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResetPasswordAdapterService
      ]
    });
    service = TestBed.inject(ResetPasswordAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toSendCodeRequestContract', () => {

    it('deve montar a requisição da redefinição de senha a partir dos dados do formulário da redefinição de senha', () => {

      const sendCodeRequestContract = service.toSendCodeRequestContract('email');

      expect(sendCodeRequestContract instanceof SendCodeRequestContract).toBeTrue();
      expect(sendCodeRequestContract.email).toBe('email');
    });
  });

  describe('toValidateCodeRequestContract', () => {

    it('deve montar a requisição da validação de código', () => {

      const validateCodeRequestContract = service.toValidateCodeRequestContract('email', 'code');

      expect(validateCodeRequestContract instanceof ValidateCodeRequestContract).toBeTrue();
      expect(validateCodeRequestContract.email).toBe('email');
      expect(validateCodeRequestContract.code).toBe('code');
    });
  });

  describe('toNewPasswordRequestContract', () => {

    it('deve montar a requisição do cadastro de nova senha', () => {

      const newPasswordRequestContract = service.toNewPasswordRequestContract('newPassword', 'email@email.com', '123456');

      expect(newPasswordRequestContract instanceof NewPasswordRequestContract).toBeTrue();
      expect(newPasswordRequestContract.newPassword).toBe('newPassword');
      expect(newPasswordRequestContract.email).toBe('email@email.com');
      expect(newPasswordRequestContract.code).toBe('123456');
    });
  });

  describe('toNewPasswordDto', () => {

    it('deve transformar a resposta do cadastro de nova senha do backend em dto', () => {

      const newPasswordResponseContract = new NewPasswordResponseContract('message');

      const newPasswordCodeDto = service.toNewPasswordDto(newPasswordResponseContract);

      expect(newPasswordCodeDto instanceof NewPasswordDto).toBeTrue();
      expect(newPasswordCodeDto.message).toBe('message');
    });
  });
});

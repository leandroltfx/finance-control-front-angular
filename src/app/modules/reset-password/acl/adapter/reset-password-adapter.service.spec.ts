import { TestBed } from '@angular/core/testing';

import { ResetPasswordAdapterService } from './reset-password-adapter.service';
import { SendCodeDto } from '../../../../shared/model/dto/send-code/send-code-dto';
import { ValidateCodeDto } from '../../../../shared/model/dto/validate-code/validate-code-dto';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { SendCodeResponseContract } from '../../../../shared/model/contracts/response/send-code/send-code-response-contract';
import { ValidateCodeRequestContract } from '../../../../shared/model/contracts/request/validate-code/validate-code-request-contract';
import { ValidateCodeResponseContract } from '../../../../shared/model/contracts/response/validate-code/validate-code-response-contract';

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

  describe('toSendCodeDto', () => {

    it('deve transformar a resposta da redefinição de senha do backend em dto', () => {

      const sendCodeResponseContract = new SendCodeResponseContract('message');

      const sendCodeDto = service.toSendCodeDto(sendCodeResponseContract);

      expect(sendCodeDto instanceof SendCodeDto).toBeTrue();
      expect(sendCodeDto.message).toBe('message');
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

  describe('validateCodeDto', () => {

    it('deve transformar a resposta da redefinição de senha do backend em dto', () => {

      const validateCodeResponseContract = new ValidateCodeResponseContract('userid');

      const validateCodeDto = service.toValidateCodeDto(validateCodeResponseContract);

      expect(validateCodeDto instanceof ValidateCodeDto).toBeTrue();
      expect(validateCodeDto.userId).toBe('userid');
    });
  });
});

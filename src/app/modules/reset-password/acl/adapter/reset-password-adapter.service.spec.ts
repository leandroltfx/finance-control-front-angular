import { TestBed } from '@angular/core/testing';

import { ResetPasswordAdapterService } from './reset-password-adapter.service';
import { SendCodeDto } from '../../../../shared/model/dto/send-code/send-code-dto';
import { SendCodeRequestContract } from '../../../../shared/model/contracts/request/send-code/send-code-request-contract';
import { SendCodeResponseContract } from '../../../../shared/model/contracts/response/send-code/send-code-response-contract';

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

  describe('toRequestContract', () => {

    it('deve montar a requisição da redefinição de senha a partir dos dados do formulário da redefinição de senha', () => {

      const sendCodeRequestContract = service.toRequestContract('email');

      expect(sendCodeRequestContract instanceof SendCodeRequestContract).toBeTrue();
      expect(sendCodeRequestContract.email).toBe('email');
    });
  });

  describe('toDto', () => {

    it('deve transformar a resposta da redefinição de senha do backend em dto', () => {

      const sendCodeResponseContract = new SendCodeResponseContract('message');

      const sendCodeDto = service.toDto(sendCodeResponseContract);

      expect(sendCodeDto instanceof SendCodeDto).toBeTrue();
      expect(sendCodeDto.message).toBe('message');
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { ResetPasswordAdapterService } from './reset-password-adapter.service';
import { ResetPasswordDto } from '../../../../shared/model/dto/reset-password/reset-password-dto';
import { ResetPasswordRequestContract } from '../../../../shared/model/contracts/request/reset-password/reset-password-request-contract';
import { ResetPasswordResponseContract } from '../../../../shared/model/contracts/response/reset-password/reset-password-response-contract';

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

      const resetPasswordRequestContract = service.toRequestContract('email');

      expect(resetPasswordRequestContract instanceof ResetPasswordRequestContract).toBeTrue();
      expect(resetPasswordRequestContract.email).toBe('email');
    });
  });

  describe('toDto', () => {

    it('deve transformar a resposta da redefinição de senha do backend em dto', () => {

      const resetPasswordResponseContract = new ResetPasswordResponseContract('message');

      const resetPasswordDto = service.toDto(resetPasswordResponseContract);

      expect(resetPasswordDto instanceof ResetPasswordDto).toBeTrue();
      expect(resetPasswordDto.message).toBe('message');
    });
  });
});

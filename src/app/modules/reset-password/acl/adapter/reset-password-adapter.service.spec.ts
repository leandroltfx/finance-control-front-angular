import { TestBed } from '@angular/core/testing';

import { ResetPasswordDto } from '../../models/dto/reset-password-dto';
import { ResetPasswordAdapterService } from './reset-password-adapter.service';
import { ResetPasswordRequestContract } from '../../models/contracts/request/reset-password-request-contract';
import { ResetPasswordResponseContract } from '../../models/contracts/response/reset-password-response-contract';

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

  describe('toDto', () => {
    it('deve transformar um contrato de resposta da redefinição de senha em dto', () => {

      const resetPasswordResponseContract: ResetPasswordResponseContract = new ResetPasswordResponseContract('message');

      const resetPasswordDto = service.toDto(resetPasswordResponseContract);

      expect(resetPasswordDto instanceof ResetPasswordDto).toBeTrue();
      expect(resetPasswordDto.message).toBe('message');
    });
  });

  describe('toRequestContract', () => {

    it('deve montar um contrato de requisição para o login', () => {

      const resetPasswordRequestContract: ResetPasswordRequestContract = service.toRequestContract('email@email.com');

      expect(resetPasswordRequestContract instanceof ResetPasswordRequestContract).toBeTrue();
      expect(resetPasswordRequestContract.email).toBe('email@email.com');
    });
  });
});

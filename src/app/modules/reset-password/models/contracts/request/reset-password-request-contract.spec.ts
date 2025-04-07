import { ResetPasswordRequestContract } from './reset-password-request-contract';

describe('ResetPasswordRequestContract', () => {
  it('should create an instance', () => {
    expect(new ResetPasswordRequestContract('email@email.com')).toBeTruthy();
  });
});

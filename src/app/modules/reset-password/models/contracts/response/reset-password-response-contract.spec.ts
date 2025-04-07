import { ResetPasswordResponseContract } from './reset-password-response-contract';

describe('ResetPasswordResponseContract', () => {
  it('should create an instance', () => {
    expect(new ResetPasswordResponseContract('message')).toBeTruthy();
  });
});

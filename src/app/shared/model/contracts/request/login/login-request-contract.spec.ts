import { LoginRequestContract } from './login-request-contract';

describe('LoginRequestContract', () => {
  it('should create an instance', () => {
    expect(new LoginRequestContract('emai', 'password')).toBeTruthy();
  });
});

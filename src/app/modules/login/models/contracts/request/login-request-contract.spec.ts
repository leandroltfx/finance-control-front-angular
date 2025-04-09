import { LoginRequestContract } from './login-request-contract';

describe('LoginRequestContract', () => {
  it('should create an instance', () => {
    expect(new LoginRequestContract('email', 'password')).toBeTruthy();
  });
});

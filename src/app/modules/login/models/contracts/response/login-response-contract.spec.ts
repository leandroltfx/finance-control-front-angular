import { LoggedUserResponseContract, LoginResponseContract } from './login-response-contract';

describe('LoginResponseContract', () => {
  it('should create an instance', () => {
    expect(new LoginResponseContract('message', new LoggedUserResponseContract('userName', 'email'))).toBeTruthy();
  });
});

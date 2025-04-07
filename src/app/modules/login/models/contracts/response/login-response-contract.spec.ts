import { LoggedUserResponseContract, LoginResponseContract } from './login-response-contract';

describe('LoginResponseContract', () => {
  it('should create an instance', () => {
    expect(new LoginResponseContract('message', new LoggedUserResponseContract('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'userName', 'email'))).toBeTruthy();
  });
});

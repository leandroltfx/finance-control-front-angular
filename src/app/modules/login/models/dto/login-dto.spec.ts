import { LoginDto } from './login-dto';
import { LoggedUserDto } from '../logged-user/logged-user-dto';

describe('LoginDto', () => {
  it('should create an instance', () => {
    expect(new LoginDto('message', new LoggedUserDto('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'userName', 'email'))).toBeTruthy();
  });
});

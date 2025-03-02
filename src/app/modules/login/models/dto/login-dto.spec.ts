import { LoginDto } from './login-dto';
import { LoggedUserDto } from '../logged-user/logged-user-dto';

describe('LoginDto', () => {
  it('should create an instance', () => {
    expect(new LoginDto('message', new LoggedUserDto('userName', 'email'))).toBeTruthy();
  });
});

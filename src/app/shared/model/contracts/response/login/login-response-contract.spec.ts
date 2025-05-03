import { LoginResponseContract } from './login-response-contract';
import { LoggedUserDto } from '../../../dto/logged-user/logged-user-dto';

describe('LoginResponseContract', () => {
  it('should create an instance', () => {
    expect(new LoginResponseContract('message', new LoggedUserDto('id', 'username', 'email'))).toBeTruthy();
  });
});

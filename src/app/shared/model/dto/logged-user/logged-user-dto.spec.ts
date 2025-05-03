import { LoggedUserDto } from './logged-user-dto';

describe('LoggedUserDto', () => {
  it('should create an instance', () => {
    expect(new LoggedUserDto('id', 'username', 'email')).toBeTruthy();
  });
});

import { NewPasswordDto } from './new-password-dto';

describe('NewPasswordDto', () => {
  it('should create an instance', () => {
    expect(new NewPasswordDto('message')).toBeTruthy();
  });
});

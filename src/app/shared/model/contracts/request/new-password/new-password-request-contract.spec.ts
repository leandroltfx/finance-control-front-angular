import { NewPasswordRequestContract } from './new-password-request-contract';

describe('NewPasswordRequestContract', () => {
  it('should create an instance', () => {
    expect(new NewPasswordRequestContract('newPassword', 'email@email.com', '123456')).toBeTruthy();
  });
});

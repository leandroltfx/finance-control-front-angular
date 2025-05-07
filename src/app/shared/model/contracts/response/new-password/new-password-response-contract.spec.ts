import { NewPasswordResponseContract } from './new-password-response-contract';

describe('NewPasswordResponseContract', () => {
  it('should create an instance', () => {
    expect(new NewPasswordResponseContract('message')).toBeTruthy();
  });
});

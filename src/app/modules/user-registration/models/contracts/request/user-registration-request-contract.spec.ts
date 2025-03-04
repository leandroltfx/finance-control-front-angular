import { UserRegistrationRequestContract } from './user-registration-request-contract';

describe('UserRegistrationRequestContract', () => {
  it('should create an instance', () => {
    expect(new UserRegistrationRequestContract('username', 'email', 'password')).toBeTruthy();
  });
});

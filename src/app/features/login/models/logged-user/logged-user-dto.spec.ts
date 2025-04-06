import { LoggedUserDto } from "./logged-user-dto";

describe('LoggedUserDto', () => {
  it('should create an instance', () => {
    expect(new LoggedUserDto('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email')).toBeTruthy();
  });
});

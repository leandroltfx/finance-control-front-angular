import { ValidateCodeRequestContract } from './validate-code-request-contract';

describe('ValidateCodeRequestContract', () => {
  it('should create an instance', () => {
    expect(new ValidateCodeRequestContract('email', '123456')).toBeTruthy();
  });
});

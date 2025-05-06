import { ValidateCodeResponseContract } from './validate-code-response-contract';

describe('ValidateCodeResponseContract', () => {
  it('should create an instance', () => {
    expect(new ValidateCodeResponseContract('userid')).toBeTruthy();
  });
});

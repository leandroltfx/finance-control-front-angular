import { SendCodeRequestContract } from './send-code-request-contract';

describe('SendCodeRequestContract', () => {
  it('should create an instance', () => {
    expect(new SendCodeRequestContract('email@email.com')).toBeTruthy();
  });
});

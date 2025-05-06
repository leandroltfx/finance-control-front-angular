import { SendCodeResponseContract } from './send-code-response-contract';

describe('SendCodeResponseContract', () => {
  it('should create an instance', () => {
    expect(new SendCodeResponseContract('message')).toBeTruthy();
  });
});

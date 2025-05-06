import { SendCodeDto } from './send-code-dto';

describe('SendCodeDto', () => {
  it('should create an instance', () => {
    expect(new SendCodeDto('message')).toBeTruthy();
  });
});

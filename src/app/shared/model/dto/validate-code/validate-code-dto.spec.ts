import { ValidateCodeDto } from './validate-code-dto';

describe('ValidateCodeDto', () => {
  it('should create an instance', () => {
    expect(new ValidateCodeDto('userid')).toBeTruthy();
  });
});

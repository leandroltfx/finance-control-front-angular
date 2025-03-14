import { BankAccountDto } from './bank-account-dto';

describe('BankAccountDto', () => {
  it('should create an instance', () => {
    expect(new BankAccountDto('id', 'institution', 'nickname', 0, 'R$ 0,00')).toBeTruthy();
  });
});

import { BankAccountDto, BankAccountsDto } from './bank-accounts-dto';

describe('BankAccountsDto', () => {
  it('should create an instance', () => {
    const bankAccountDto: BankAccountDto = new BankAccountDto('id', 'institution', 'nickname', 0);
    expect(new BankAccountsDto([bankAccountDto])).toBeTruthy();
  });
});

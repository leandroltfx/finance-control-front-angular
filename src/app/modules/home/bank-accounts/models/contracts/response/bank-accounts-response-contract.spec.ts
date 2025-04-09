import { BankAccountResponse, BankAccountsResponseContract } from './bank-accounts-response-contract';

describe('BankAccountsResponseContract', () => {
  it('should create an instance', () => {
    const bankAccountResponse: BankAccountResponse = new BankAccountResponse('id', 'institution', 'nickname', 0);
    expect(new BankAccountsResponseContract([bankAccountResponse])).toBeTruthy();
  });
});

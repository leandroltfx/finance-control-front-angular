import { BankAccountsRequestContract } from './bank-accounts-request-contract';

describe('BankAccountsRequestContract', () => {
  it('should create an instance', () => {
    expect(new BankAccountsRequestContract('userId')).toBeTruthy();
  });
});

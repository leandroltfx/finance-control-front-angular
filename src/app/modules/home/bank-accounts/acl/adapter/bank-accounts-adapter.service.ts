import { Injectable } from '@angular/core';

import { BankAccountDto } from '../../models/dto/bank-account-dto';
import { BankAccountsRequestContract } from '../../models/contracts/request/bank-accounts-request-contract';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';

@Injectable()
export class BankAccountsAdapterService {

  constructor() { }

  public toDto(
    bankAccountsResponseContract: BankAccountsResponseContract
  ): BankAccountDto[] {

    const bankAccountsDto: BankAccountDto[] = [];

    for (const bankAccountResponse of bankAccountsResponseContract.bankAccounts) {
      const bankAccountDto: BankAccountDto = new BankAccountDto(
        bankAccountResponse.id,
        bankAccountResponse.institution,
        bankAccountResponse.nickname,
        bankAccountResponse.balance,
        this._formatCurrencyBrl(bankAccountResponse.balance),
      );
      bankAccountsDto.push(bankAccountDto);
    }

    return bankAccountsDto;
  }

  public toRequestContract(
    userId: string
  ): BankAccountsRequestContract {
    return new BankAccountsRequestContract(userId);
  }

  private _formatCurrencyBrl(value: number): string {
    return '';
  }
}

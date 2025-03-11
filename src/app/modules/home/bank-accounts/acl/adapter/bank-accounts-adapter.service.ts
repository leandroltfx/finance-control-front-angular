import { Injectable } from '@angular/core';

import { BankAccountDto } from '../../models/dto/bank-accounts-dto';
import { BankAccountsRequestContract } from '../../models/contracts/request/bank-accounts-request-contract';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';

@Injectable()
export class BankAccountsAdapterService {

  constructor() { }

  public toDto(
    bankAccountsResponseContract: BankAccountsResponseContract
  ): BankAccountDto[] {

    const bankAccountsDto: BankAccountDto[] = [];

    for (const bankAccount of bankAccountsResponseContract.bankAccounts) {
      bankAccountsDto.push(bankAccount);
    }

    return bankAccountsDto;
  }

  public toRequestContract(
    userId: string
  ): BankAccountsRequestContract {
    return new BankAccountsRequestContract(userId);
  }
}

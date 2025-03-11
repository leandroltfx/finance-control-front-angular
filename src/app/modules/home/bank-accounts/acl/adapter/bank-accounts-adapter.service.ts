import { Injectable } from '@angular/core';

import { BankAccountsDto } from '../../models/dto/bank-accounts-dto';
import { BankAccountsRequestContract } from '../../models/contracts/request/bank-accounts-request-contract';
import { BankAccountsResponseContract } from '../../models/contracts/response/bank-accounts-response-contract';

@Injectable()
export class BankAccountsAdapterService {

  constructor() { }

  public toDto(
    bankAccountsResponseContract: BankAccountsResponseContract
  ): BankAccountsDto {
    return new BankAccountsDto(bankAccountsResponseContract.bankAccounts);
  }

  public toRequestContract(
    userId: string
  ): BankAccountsRequestContract {
    return new BankAccountsRequestContract(userId);
  }
}

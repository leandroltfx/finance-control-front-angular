export class BankAccountDto {

    id!: string;
    institution!: string;
    nickname!: string;
    balance!: number;

    constructor(
        id: string,
        institution: string,
        nickname: string,
        balance: number,
    ) {
        this.id = id;
        this.institution = institution;
        this.nickname = nickname;
        this.balance = balance;
    }

}

export class BankAccountsDto {

    bankAccounts: BankAccountDto[] = [];

    constructor(
        bankAccounts: BankAccountDto[]
    ) {
        this.bankAccounts = bankAccounts;
    }

}

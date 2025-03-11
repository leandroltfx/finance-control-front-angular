export class BankAccountDto {

    id!: string;
    institution!: string;
    nickname!: string;
    balance!: number;
    formattedBalance!: string;

    constructor(
        id: string,
        institution: string,
        nickname: string,
        balance: number,
        formattedBalance: string,
    ) {
        this.id = id;
        this.institution = institution;
        this.nickname = nickname;
        this.balance = balance;
        this.formattedBalance = formattedBalance;
    }

}

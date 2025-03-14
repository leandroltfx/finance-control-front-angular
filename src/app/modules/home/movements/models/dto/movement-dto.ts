export class MovementDto {

    id!: string;
    bankAccount!: string;
    value!: number;
    description!: string;
    category!: string;
    formattedBalance!: string;

    constructor(
        id: string,
        bankAccount: string,
        value: number,
        description: string,
        category: string,
        formattedBalance: string,
    ) {
        this.id = id;
        this.bankAccount = bankAccount;
        this.value = value;
        this.description = description;
        this.category = category;
        this.formattedBalance = formattedBalance;
    }

}

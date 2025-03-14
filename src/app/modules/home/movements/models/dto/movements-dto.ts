export class MovementsDto {

    id!: string;
    bankAccount!: string;
    value!: number;
    description!: string;
    category!: string;

    constructor(
        id: string,
        bankAccount: string,
        value: number,
        description: string,
        category: string,
    ) {
        this.id = id;
        this.bankAccount = bankAccount;
        this.value = value;
        this.description = description;
        this.category = category;
    }

}

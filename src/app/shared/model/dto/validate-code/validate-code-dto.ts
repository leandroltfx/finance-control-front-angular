export class ValidateCodeDto {

    userId!: string;

    constructor(
        userId: string
    ) {
        this.userId = userId;
    }

}

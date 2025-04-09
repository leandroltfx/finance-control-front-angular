export class ResetPasswordDto {

    public message!: string;

    constructor(
        message: string
    ) {
        this.message = message;
    }

}

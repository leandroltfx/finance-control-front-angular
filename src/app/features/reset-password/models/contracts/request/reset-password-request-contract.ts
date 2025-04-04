export class ResetPasswordRequestContract {

    public email!: string;

    constructor(
        email: string
    ) {
        this.email = email;
    }

}

export class ResetPasswordRequestContract {

    email!: string;

    constructor(
        email: string
    ) {
        this.email = email;
    }

}

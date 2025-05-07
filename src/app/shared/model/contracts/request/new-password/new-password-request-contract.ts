export class NewPasswordRequestContract {

    newPassword!: string;
    email!: string;

    constructor(
        newPassword: string,
        email: string
    ) {
        this.newPassword = newPassword;
        this.email = email;
    }

}

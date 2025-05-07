export class NewPasswordRequestContract {

    newPassword!: string;
    email!: string;
    code!: string;

    constructor(
        newPassword: string,
        email: string,
        code: string
    ) {
        this.newPassword = newPassword;
        this.email = email;
        this.code = code;
    }

}

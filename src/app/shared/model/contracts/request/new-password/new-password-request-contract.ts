export class NewPasswordRequestContract {

    newPassword!: string;

    constructor(
        newPassword: string
    ) {
        this.newPassword = newPassword;
    }

}

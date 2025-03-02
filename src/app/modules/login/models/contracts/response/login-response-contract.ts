export class LoggedUserResponseContract {

    userName!: string;
    email!: string;

    constructor(
        userName: string,
        email: string,
    ) {
        this.userName = userName;
        this.email = email;
    }
}

export class LoginResponseContract {

    message!: string;
    loggedUser!: LoggedUserResponseContract;

    constructor(
        message: string,
        loggedUser: LoggedUserResponseContract,
    ) {
        this.message = message;
        this.loggedUser = loggedUser;
    }
}

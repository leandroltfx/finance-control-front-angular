export class LoggedUserResponseContract {

    id!: string;
    userName!: string;
    email!: string;

    constructor(
        id: string,
        userName: string,
        email: string,
    ) {
        this.id = id;
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

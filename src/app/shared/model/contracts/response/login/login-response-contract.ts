import { LoggedUserDto } from "../../../dto/logged-user/logged-user-dto";

export class LoginResponseContract {

    message!: string;
    loggedUser!: LoggedUserDto;

    constructor(
        message: string,
        loggedUser: LoggedUserDto
    ) {
        this.message = message;
        this.loggedUser = loggedUser;
    }

}

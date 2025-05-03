import { LoggedUserDto } from "../logged-user/logged-user-dto";

export class LoginDto {

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

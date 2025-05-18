import { LoggedUserDto } from "../../../dto/logged-user/logged-user-dto";

export class LoginResponseContract {

    messages!: string[];
    loggedUser!: LoggedUserDto;

    constructor(
        messages: [],
        loggedUser: LoggedUserDto
    ) {
        this.messages = messages;
        this.loggedUser = loggedUser;
    }

}

import { LoggedUserDto } from "../logged-user/logged-user-dto";

export class LoginDto {

    messages!: string[];
    loggedUser!: LoggedUserDto;

    constructor(
        messages: string[],
        loggedUser: LoggedUserDto
    ) {
        this.messages = messages;
        this.loggedUser = loggedUser;
    }

}

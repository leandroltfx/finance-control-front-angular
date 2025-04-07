import { LoginRequestContract } from "../../../../../modules/login/models/contracts/request/login-request-contract";

export class UserRegistrationRequestContract extends LoginRequestContract {

    username!: string;

    constructor(
        username: string,
        email: string,
        password: string,
    ) {
        super(email, password);
        this.username = username;
    }
}

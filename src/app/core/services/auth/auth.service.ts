import { Injectable } from '@angular/core';

import { LoggedUserDto } from '../../../modules/login/models/logged-user/logged-user-dto';

@Injectable()
export class AuthService {

  private _loggedUser: LoggedUserDto | null = null;

  constructor() { }

  public get loggedUser(): LoggedUserDto | null {
    return this._loggedUser;
  }

  public set loggedUser(loggedUser: LoggedUserDto | null) {
    this._loggedUser = loggedUser;
  }

}

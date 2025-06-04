import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../acl/service/user.service';
import { MessageService } from '../../../shared/services/message/message.service';
import { UserRegistrationResponseDto } from '../domain/dto/response/user-registration-response.dto';

@Injectable()
export class UserFacadeService {

  constructor(
    private readonly _userService: UserService,
    private readonly _messageService: MessageService
  ) { }

  public registerUser(
    username: string,
    email: string,
    password: string
  ): void {
    this._userService.registerUser(
      username,
      email,
      password
    ).subscribe(
      {
        next: (userRegistrationResponseDto: UserRegistrationResponseDto) => 
          this._messageService.showSuccessMessage(userRegistrationResponseDto.message),
        error: (httpErrorResponse: HttpErrorResponse) => 
          this._messageService.showErrorMessage(httpErrorResponse.error.message ?? 'Ocorreu um erro inesperado, tente novamente mais tarde.')
      }
    );
  }
}

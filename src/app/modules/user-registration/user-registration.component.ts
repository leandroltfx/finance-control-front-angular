import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Message } from '../../shared/enum/message.enum';
import { LoginDto } from '../login/models/dto/login-dto';
import { RoutesEnum } from '../../shared/enum/routes.enum';
import { MessageService } from '../../core/services/message/message.service';
import { UserRegistrationService } from './acl/service/user-registration.service';

@Component({
  selector: 'fc-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public hidePassword: boolean = true;
  public userRegistrationForm!: FormGroup;

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  private _patternUsername: RegExp = /^[A-Za-z0-9_]+$/;
  private _minLengthPassword: number = 8;
  private _minLengthUsername: number = 3;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService,
    private readonly _userRegistrationService: UserRegistrationService
  ) { }

  public ngOnInit(): void {
    this.userRegistrationForm = this._buildUserRegistrationForm();
  }

  public registerUser(): void {
    if (this.userRegistrationForm.valid) {
      this._userRegistrationService.registerUser(
        this.userRegistrationForm.controls['username'].value,
        this.userRegistrationForm.controls['email'].value,
        this.userRegistrationForm.controls['password'].value,
      ).subscribe(
        {
          next: ((loginDto: LoginDto) => {
            this._messageService.showMessage(loginDto.message, 'success');
            this._router.navigate([RoutesEnum.HOME]);
          }),
          error: ((httpResponseError: HttpErrorResponse) => {
            this._messageService.showMessage(httpResponseError.error['message'] ?? Message.DEFAULT_HTTP_ERROR_MESSAGE, 'error');
          }),
        }
      );
    }
  }

  public cancelRegisterUser(): void {
    this._router.navigate([RoutesEnum.LOGIN]);
  }

  private _buildUserRegistrationForm(): FormGroup {
    return this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this._patternEmail)]],
        username: ['', [Validators.required, Validators.pattern(this._patternUsername), Validators.minLength(this._minLengthUsername)]],
        password: ['', [Validators.required, Validators.minLength(this._minLengthPassword)]]
      }
    );
  }

}

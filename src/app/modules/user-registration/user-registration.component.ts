import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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

  public userRegistrationForm!: FormGroup;
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;
  public passwordMinLength: number = 8;

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  private _patternUsername: RegExp = /^[A-Za-z0-9_]+$/;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService,
    private readonly _userRegistrationService: UserRegistrationService,
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

  public updateConfirmValidator(): void {
    Promise.resolve().then(() => this.userRegistrationForm.controls['confirmPassword'].updateValueAndValidity());
  }

  private _buildUserRegistrationForm(): FormGroup {
    return this._formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(this._patternUsername)]],
      email: [null, [Validators.required, Validators.pattern(this._patternEmail)]],
      password: [null, [Validators.required, Validators.minLength(this.passwordMinLength)]],
      confirmPassword: [null, [Validators.required, this._confirmationValidator]],
    });
  }

  private _confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.userRegistrationForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}

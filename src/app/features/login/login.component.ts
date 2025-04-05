import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginDto } from './models/dto/login-dto';
import { Message } from '../../shared/enum/message.enum';
import { RoutesEnum } from '../../shared/enum/routes.enum';
import { LoginService } from './acl/service/login.service';
import { MessageService } from '../../core/services/message/message.service';

@Component({
  selector: 'fc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public hidePassword: boolean = true;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _loginService: LoginService,
    private readonly _messageService: MessageService,
  ) { }

  public ngOnInit(): void {
    this.loginForm = this._buildLoginForm();
  }

  public login(): void {
    if (this.loginForm.valid) {
      this._loginService.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value,
      ).subscribe(
        {
          next: ((loginDto: LoginDto) => {
            // TODO
            // Rotear para a home
            this._messageService.showMessage(loginDto.message, 'success');
          }),
          error: ((httpResponseError: HttpErrorResponse) => {
            this._messageService.showMessage(httpResponseError.error['message'] ?? Message.DEFAULT_HTTP_ERROR_MESSAGE, 'error');
          }),
        }
      );
    }
  }

  public goToUserRegistration(): void {
    this._router.navigate([RoutesEnum.USER_REGISTRATION]);
  }

  public goToResetPassword(): void {
    this._router.navigate([RoutesEnum.RESET_PASSWORD]);
  }

  private _buildLoginForm(): FormGroup {
    return this._formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }

}

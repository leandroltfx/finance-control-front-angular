import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginDto } from './models/dto/login-dto';
import { RoutesEnum } from '../../shared/enum/routes.enum';
import { LoginService } from './acl/service/login.service';

@Component({
  selector: 'fc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _loginService: LoginService,
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
          next: ((loginDto: LoginDto) => console.log(loginDto)),
          error: ((httpResponseError: HttpErrorResponse) => console.log(httpResponseError)),
        }
      );
    }
  }

  public goToUserRegistration(): void {
    this._router.navigate([RoutesEnum.USER_REGISTRATION]);
  }

  public goToRecoverPassword(): void {
    this._router.navigate([RoutesEnum.RESET_PASSWORD]);
  }

  private _buildLoginForm(): FormGroup {
    return this._formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}

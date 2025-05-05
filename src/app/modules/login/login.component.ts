import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { LoginService } from './acl/service/login.service';
import { LoginDto } from '../../shared/model/dto/login/login-dto';

@Component({
  selector: 'fc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public hidePassword: boolean = true;

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._buildLoginForm();
  }

  public login(): void {
    if (this.loginForm.valid) {
      this._loginService.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      ).subscribe(
        {
          next: (loginDto: LoginDto) => console.log('ok', loginDto),
          error: (httpErrorResponse: HttpErrorResponse) => console.log('erro', httpErrorResponse)
        }
      )
    }
  }

  public goToUserRegistration(): void {
    this._router.navigate(['/user-registration']);
  }

  private _buildLoginForm(): FormGroup {
    return this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this._patternEmail)]],
        password: ['', Validators.required]
      }
    )
  }

}

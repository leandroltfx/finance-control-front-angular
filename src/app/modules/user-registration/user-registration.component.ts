import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { LoginDto } from '../../shared/model/dto/login/login-dto';
import { UserRegistrationService } from './acl/service/user-registration.service';

@Component({
  selector: 'fc-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public userRegistrationForm!: FormGroup;
  public hidePassword: boolean = true;
  public passwordMinLength: number = 8;

  private _patternUsername: RegExp = /^[a-zA-Z0-9]+$/;
  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _userRegistrationService: UserRegistrationService
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this._buildUserRegistrationForm();
  }

  public registerUser(): void {
    if (this.userRegistrationForm.valid) {
      this._userRegistrationService.registerUser(
        this.userRegistrationForm.controls['username'].value,
        this.userRegistrationForm.controls['email'].value,
        this.userRegistrationForm.controls['password'].value
      ).subscribe(
        {
          next: (loginDto: LoginDto) => console.log('ok', loginDto),
          error: (httpErrorResponse: HttpErrorResponse) => console.log('erro', httpErrorResponse)
        }
      );
    }
  }

  public cancelUserRegistration(): void {
    this._router.navigate(['/login']);
  }

  private _buildUserRegistrationForm(): FormGroup {
    return this._formBuilder.group(
      {
        username: ['', [Validators.required, Validators.pattern(this._patternUsername)]],
        email: ['', [Validators.required, Validators.pattern(this._patternEmail)]],
        password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
      }
    )
  }

}

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoutesEnum } from '../../shared/enum/routes.enum';

@Component({
  selector: 'fc-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public userRegistrationForm!: FormGroup;
  public hidePassword: boolean = true;

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  private _patternUsername: RegExp = /^\S+$/;
  private _minLengthPassword: number = 8;
  private _minLengthUsername: number = 3;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.userRegistrationForm = this._buildUserRegistrationForm();
  }

  public registerUser(): void { }

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

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RoutesEnum } from '../../shared/enum/routes.enum';

@Component({
  selector: 'fc-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public userRegistrationForm!: FormGroup;
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.userRegistrationForm = this._buildUserRegistrationForm();
  }

  public registerUser(): void { }

  public cancelRegisterUser(): void {
    this._router.navigate([RoutesEnum.LOGIN]);
  }

  private _buildUserRegistrationForm(): FormGroup {
    return this._formBuilder.group({
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    });
  }

}

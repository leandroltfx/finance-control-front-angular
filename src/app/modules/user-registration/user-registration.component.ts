import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  private _patternUsername: RegExp = /^[A-Za-z0-9_]+$/;

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

  public updateConfirmValidator(): void {
    Promise.resolve().then(() => this.userRegistrationForm.controls['confirmPassword'].updateValueAndValidity());
  }

  private _buildUserRegistrationForm(): FormGroup {
    return this._formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(this._patternUsername)]],
      email: [null, [Validators.required, Validators.pattern(this._patternEmail)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
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

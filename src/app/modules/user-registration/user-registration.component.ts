import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this._buildUserRegistrationForm();
  }

  public registerUser(): void {
    if (this.userRegistrationForm.valid) {
      console.log('user registration form is valid');
    }
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

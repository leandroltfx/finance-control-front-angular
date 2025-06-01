import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'fc-user-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule
  ],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public userRegistrationForm!: FormGroup;
  public hidePassword: boolean = true;

  private _validatorMinLengthUsername: ValidatorFn = Validators.minLength(3);
  private _validatorMinLengthPassword: ValidatorFn = Validators.minLength(8);
  private _validatorPatternUsername: ValidatorFn = Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/);
  private _validatorPatternEmail: ValidatorFn = Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.userRegistrationForm = this._buildUserRegistrationForm();
  }

  public registerUser(): void {
    if (this.userRegistrationForm.valid) {
      console.log('chamar o serviço de cadastro de usuário');
    }
  }

  private _buildUserRegistrationForm(): FormGroup {
    return this._formBuilder.group(
      {
        username: [null, [Validators.required, this._validatorMinLengthUsername, this._validatorPatternUsername]],
        email: [null, [Validators.required, this._validatorPatternEmail]],
        password: [null, [Validators.required, this._validatorMinLengthPassword]]
      }
    );
  }

}

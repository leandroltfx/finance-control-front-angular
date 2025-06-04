import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserService } from '../acl/service/user.service';
import { UserProxyService } from '../acl/proxy/user-proxy.service';
import { UserFacadeService } from '../application/user-facade.service';
import { UserAdapterService } from '../acl/adapter/user-adapter.service';

@Component({
  selector: 'fc-user-registration',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule
  ],
  providers: [
    UserService,
    UserProxyService,
    UserFacadeService,
    UserAdapterService
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
  private _validatorPatternEmail: ValidatorFn = Validators.pattern(/^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/i);

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userFacadeService: UserFacadeService
  ) { }

  public ngOnInit(): void {
    this.userRegistrationForm = this._buildUserRegistrationForm();
  }

  public registerUser(): void {
    if (this.userRegistrationForm.valid) {
      this._userFacadeService.registerUser(
        this.userRegistrationForm.controls['username'].value,
        this.userRegistrationForm.controls['email'].value,
        this.userRegistrationForm.controls['password'].value
      );
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

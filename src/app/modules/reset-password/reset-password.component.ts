import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'fc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  public resetPasswordForm!: FormGroup;

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) { }

  public ngOnInit(): void {
    this.resetPasswordForm = this._buildResetPasswordForm();
  }

  public sendCodeToEmail(): void {
    if (this.resetPasswordForm.valid) {
      console.log('ok');
    }
  }

  public cancelResetPassword(): void {
    this._router.navigate(['/login']);
  }

  private _buildResetPasswordForm(): FormGroup {
    return this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this._patternEmail)]]
      }
    )
  }

}

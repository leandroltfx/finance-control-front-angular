import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoutesEnum } from '../../shared/enum/routes.enum';

@Component({
  selector: 'fc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.resetPasswordForm = this._buildResetPasswordForm();
  }

  public sendTemporaryPassword(): void { }

  public cancelResetPassword(): void {
    this._router.navigate([RoutesEnum.LOGIN]);
  }

  private _buildResetPasswordForm(): FormGroup {
    return this._formBuilder.group(
      {
        email: ['', [Validators.required]]
      }
    );
  }
}

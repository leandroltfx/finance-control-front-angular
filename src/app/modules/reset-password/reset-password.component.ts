import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoutesEnum } from '../../shared/enum/routes.enum';
import { ResetPasswordDto } from './models/dto/reset-password-dto';
import { ResetPasswordService } from './acl/service/reset-password.service';

@Component({
  selector: 'fc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public recoverPasswordForm!: FormGroup;

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _resetPasswordService: ResetPasswordService,
  ) { }

  public ngOnInit(): void {
    this.recoverPasswordForm = this._buildRecoverPasswordForm();
  }

  public recoverPassword(): void {
    if (this.recoverPasswordForm.valid) {
      this._resetPasswordService.resetPassword(
        this.recoverPasswordForm.controls['email'].value
      ).subscribe(
        {
          next: ((resetPasswordDto: ResetPasswordDto) => console.log(resetPasswordDto)),
          error: ((httpResponseError: HttpErrorResponse) => console.log(httpResponseError)),
        }
      );
    }
  }

  public goToLogin(): void {
    this._router.navigate([RoutesEnum.LOGIN]);
  }

  private _buildRecoverPasswordForm(): FormGroup {
    return this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this._patternEmail)]],
    });
  }
}

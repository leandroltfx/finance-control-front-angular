import { HttpErrorResponse } from '@angular/common/http';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordService } from '../../acl/service/reset-password.service';

@Component({
  selector: 'fc-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.css']
})
export class ValidateCodeComponent implements OnInit {

  @Output() eventGoToNewPassword = new EventEmitter();
  @Output() eventBackToLogin = new EventEmitter();

  @Input() email!: string;

  public validateCodeForm!: FormGroup;

  private _codeMinLength: number = 6;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _resetPasswordService: ResetPasswordService
  ) { }

  public ngOnInit(): void {
    this.validateCodeForm = this._buildValidateCodeForm();
  }

  public validateCode(): void {
    if (this.validateCodeForm.valid) {
      const code = this.validateCodeForm.controls['code'].value;
      this._resetPasswordService.validateCode(
        this.email,
        code
      ).subscribe(
        {
          next: () => this.eventGoToNewPassword.emit(code),
          error: (httpErrorResponse: HttpErrorResponse) => console.log('erro', httpErrorResponse)
        }
      );
    }
  }

  public cancel(): void {
    this.eventBackToLogin.emit();
  }

  private _buildValidateCodeForm(): FormGroup {
    return this._formBuilder.group(
      {
        code: ['', [Validators.required, Validators.minLength(this._codeMinLength)]]
      }
    )
  }

}

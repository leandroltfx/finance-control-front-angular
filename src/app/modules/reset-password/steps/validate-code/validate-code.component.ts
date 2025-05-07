import { HttpErrorResponse } from '@angular/common/http';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordService } from '../../acl/service/reset-password.service';
import { ValidateCodeDto } from '../../../../shared/model/dto/validate-code/validate-code-dto';

@Component({
  selector: 'fc-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.css']
})
export class ValidateCodeComponent implements OnInit {

  @Output() eventNextStep = new EventEmitter();
  @Output() eventBackToLogin = new EventEmitter();

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
      //TODO passar o email informado no primeiro passo
      this._resetPasswordService.validateCode(
        'email@email.com',
        this.validateCodeForm.controls['code'].value
      ).subscribe(
        {
          next: (validateCodeDto: ValidateCodeDto) => {
            console.log('ok', validateCodeDto);
            this.eventNextStep.emit();
          },
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

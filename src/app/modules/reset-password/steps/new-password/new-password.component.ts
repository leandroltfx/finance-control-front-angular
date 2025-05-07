import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordService } from '../../acl/service/reset-password.service';
import { NewPasswordDto } from '../../../../shared/model/dto/new-password/new-password-dto';

@Component({
  selector: 'fc-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {

  @Output() eventBackToLogin = new EventEmitter();

  @Input() email!: string;
  @Input() code!: string;

  public updatePasswordForm!: FormGroup;
  public hidePassword: boolean = true;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _resetPasswordService: ResetPasswordService
  ) { }

  public ngOnInit(): void {
    this.updatePasswordForm = this._buildUpdatePasswordForm();
  }

  public createNewPassword(): void {
    if (this.updatePasswordForm.valid) {
      this._resetPasswordService.createNewPassword(
        this.updatePasswordForm.controls['newPassword'].value,
        this.email,
        this.code
      ).subscribe(
        {
          next: (newPasswordDto: NewPasswordDto) => {
            console.log('ok', newPasswordDto);
            this.eventBackToLogin.emit();
          },
          error: (httpErrorResponse: HttpErrorResponse) => console.log('erro', httpErrorResponse)
        }
      );
    }
  }

  public cancel(): void {
    this.eventBackToLogin.emit();
  }

  private _buildUpdatePasswordForm(): FormGroup {
    return this._formBuilder.group(
      {
        newPassword: ['', Validators.required]
      }
    )
  }

}

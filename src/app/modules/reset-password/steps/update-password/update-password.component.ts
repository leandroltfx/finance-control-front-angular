import { Component, EventEmitter, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordService } from '../../acl/service/reset-password.service';

@Component({
  selector: 'fc-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  @Output() eventFinish = new EventEmitter();
  @Output() eventCancel = new EventEmitter();

  public updatePasswordForm!: FormGroup;
  public hidePassword: boolean = true;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _resetPasswordService: ResetPasswordService
  ) { }

  public ngOnInit(): void {
    this.updatePasswordForm = this._buildUpdatePasswordForm();
  }

  public updatePassword(): void {
    if (this.updatePasswordForm.valid) {
      this._resetPasswordService
      this.eventFinish.emit();
    }
  }

  public cancel(): void {
    this.eventCancel.emit();
  }

  private _buildUpdatePasswordForm(): FormGroup {
    return this._formBuilder.group(
      {
        password: ['', Validators.required]
      }
    )
  }

}

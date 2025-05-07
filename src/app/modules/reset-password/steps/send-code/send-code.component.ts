import { HttpErrorResponse } from '@angular/common/http';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordService } from '../../acl/service/reset-password.service';

@Component({
  selector: 'fc-send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.css']
})
export class SendCodeComponent implements OnInit {

  @Output() eventNextStep = new EventEmitter<string>();
  @Output() eventBackToLogin = new EventEmitter();

  public sendCodeForm!: FormGroup;

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _resetPasswordService: ResetPasswordService
  ) { }

  public ngOnInit(): void {
    this.sendCodeForm = this._buildSendCodeForm();
  }

  public sendCodeToEmail(): void {
    if (this.sendCodeForm.valid) {
      const email = this.sendCodeForm.controls['email'].value;
      this._resetPasswordService.sendCodeToEmail(
        email
      ).subscribe(
        {
          next: () => this.eventNextStep.emit(email),
          error: (httpErrorResponse: HttpErrorResponse) => console.log('error', httpErrorResponse)
        }
      );
    }
  }

  public cancel(): void {
    this.eventBackToLogin.emit();
  }

  private _buildSendCodeForm(): FormGroup {
    return this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this._patternEmail)]]
      }
    )
  }

}

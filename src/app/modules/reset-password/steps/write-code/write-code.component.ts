import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResetPasswordService } from '../../acl/service/reset-password.service';

@Component({
  selector: 'fc-write-code',
  templateUrl: './write-code.component.html',
  styleUrls: ['./write-code.component.css']
})
export class WriteCodeComponent implements OnInit {

  @Output() eventNextStep = new EventEmitter();
  @Output() eventCancel = new EventEmitter();

  public writeCodeForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _resetPasswordService: ResetPasswordService
  ) { }

  public ngOnInit(): void {
    this.writeCodeForm = this._buildWriteCodeForm();
  }

  public validateCode(): void {
    if (this.writeCodeForm.valid) {
      this._resetPasswordService
      this.eventNextStep.emit();
    }
  }

  public cancel(): void {
    this.eventCancel.emit();
  }

  private _buildWriteCodeForm(): FormGroup {
    return this._formBuilder.group(
      {
        code: ['', Validators.required]
      }
    )
  }

}

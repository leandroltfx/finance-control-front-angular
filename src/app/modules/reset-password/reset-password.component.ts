import { Component, ViewChild } from '@angular/core';

import { MatStepper } from '@angular/material/stepper';

import { Router } from '@angular/router';

@Component({
  selector: 'fc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  @ViewChild('stepper') stepper!: MatStepper;

  public email!: string;
  public code!: string;

  constructor(
    private readonly _router: Router
  ) { }

  public goToValidateCode(email: string): void {
    this.email = email;
    this.stepper.next();
  }

  public goToNewPassword(code: string): void {
    this.code = code;
    this.stepper.next();
  }

  public backToLogin(): void {
    this._router.navigate(['/login']);
  }

}

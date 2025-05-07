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

  constructor(
    private readonly _router: Router
  ) { }

  public nextStep(email: string): void {
    this.email = email;
    this.stepper.next();
  }

  public backToLogin(): void {
    this._router.navigate(['/login']);
  }

}

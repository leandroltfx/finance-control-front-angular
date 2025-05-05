import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'fc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(
    private readonly _router: Router
  ) { }

  public backToLogin(): void {
    this._router.navigate(['/login']);
  }

}

import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _matSnackBar: MatSnackBar
  ) { }

  public showSuccessMessage(message: string): void {
    this._matSnackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
      panelClass: ['success-message', 'fc-txt-center']
    });
  }

  public showErrorMessage(message: string): void {
    this._matSnackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
      panelClass: ['error-message', 'fc-txt-center']
    });
  }
}

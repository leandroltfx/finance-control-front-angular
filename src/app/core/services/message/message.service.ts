import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { MessageType } from '../../../shared/types/message-type';

@Injectable()
export class MessageService {

  private readonly _duration: number = 4000;
  private readonly _verticalPosition: MatSnackBarVerticalPosition = 'top';
  private readonly _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private readonly _panelClassByMessageType = new Map<string, string>(
    [
      ['success', 'fc-success-message'],
      ['warning', 'fc-warning-message'],
      ['error', 'fc-error-message'],
    ]
  );

  constructor(
    private readonly _matSnackBar: MatSnackBar
  ) { }

  showMessage(
    messages: string[],
    messageType: MessageType
  ): void {
    for (const message of messages) {
      this._matSnackBar.open(
        message,
        '',
        {
          duration: this._duration,
          verticalPosition: this._verticalPosition,
          horizontalPosition: this._horizontalPosition,
          panelClass: this._panelClassByMessageType.get(messageType)
        }
      );
    }
  }
}

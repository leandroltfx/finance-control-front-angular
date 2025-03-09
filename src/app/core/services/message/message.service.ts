import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { MessageType } from '../../../shared/types/message.type';

@Injectable()
export class MessageService {

  private readonly _durationMessage: number = 4000;
  private readonly _horizontalPositionMessage: MatSnackBarHorizontalPosition = 'center';
  private readonly _verticalPositionMessage: MatSnackBarVerticalPosition = 'top';
  private readonly _mapPanelClassByMessageType = new Map<string, string>(
    [
      ["success", "success-message"],
      ["warning", "warning-message"],
      ["error", "error-message"]
    ]
  )

  constructor(
    private readonly _matSnackBar: MatSnackBar
  ) { }

  public showMessage(
    message: string,
    type: MessageType,
  ): void {
    this._matSnackBar.open(
      message,
      '',
      {
        duration: this._durationMessage,
        horizontalPosition: this._horizontalPositionMessage,
        verticalPosition: this._verticalPositionMessage,
        panelClass: this._mapPanelClassByMessageType.get(type),
      }
    );
  }
}

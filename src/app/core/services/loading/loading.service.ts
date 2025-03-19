import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {

  private _eventSubject = new Subject<any>(); // O Subject que irá emitir os eventos
  event$ = this._eventSubject.asObservable(); // O Observable que os componentes podem subscrever

  constructor() { }

  // Método para emitir um evento
  public emitEvent(data: any) {
    this._eventSubject.next(data);
  }
}

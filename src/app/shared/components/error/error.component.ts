import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fc-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  @Input() message!: string;
  @Output() emitEventRetry = new EventEmitter();

  public retry(): void {
    this.emitEventRetry.emit();
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      imports: [
        TranslateModule.forRoot(),

        MatIconModule,
        MatButtonModule,
      ]
    });
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('retry', () => {
    it('deve emitir evento para retentativa', () => {

      const emitSpy = spyOn(component.emitEventRetry, 'emit');

      component.retry();

      expect(emitSpy).toHaveBeenCalled();
    });
  });
});

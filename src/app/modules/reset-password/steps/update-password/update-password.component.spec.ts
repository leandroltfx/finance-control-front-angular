import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UpdatePasswordComponent } from './update-password.component';
import { ResetPasswordService } from '../../acl/service/reset-password.service';

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let resetPasswordServiceSpy: jasmine.SpyObj<ResetPasswordService>;

  beforeEach(() => {

    resetPasswordServiceSpy = jasmine.createSpyObj<ResetPasswordService>('ResetPasswordService', ['sendCodeToEmail']);

    TestBed.configureTestingModule({
      declarations: [
        UpdatePasswordComponent
      ],
      imports: [
        ReactiveFormsModule,

        BrowserAnimationsModule,

        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: ResetPasswordService, useValue: resetPasswordServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancel', () => {
    it('deve emitir evento para cancelar o fluxo de redefinição de senha', () => {
      const emitSpy = spyOn(component.eventCancel, 'emit');

      component.cancel();

      expect(emitSpy).toHaveBeenCalled();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorResponse } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of, throwError } from 'rxjs';

import { NewPasswordComponent } from './new-password.component';
import { ResetPasswordService } from '../../acl/service/reset-password.service';
import { NewPasswordDto } from '../../../../shared/model/dto/new-password/new-password-dto';

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;
  let resetPasswordServiceSpy: jasmine.SpyObj<ResetPasswordService>;

  beforeEach(() => {

    resetPasswordServiceSpy = jasmine.createSpyObj<ResetPasswordService>('ResetPasswordService', ['createNewPassword']);

    TestBed.configureTestingModule({
      declarations: [
        NewPasswordComponent
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
    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createNewPassword', () => {
    it('deve chamar o serviço de criação da nova senha', () => {

      component.updatePasswordForm = component['_buildUpdatePasswordForm']();
      component.updatePasswordForm.controls['newPassword'].setValue('newPassword');
      component.email = 'email@email.com';
      const newPasswordDto: NewPasswordDto = new NewPasswordDto('userid');
      resetPasswordServiceSpy.createNewPassword.and.returnValue(of(newPasswordDto));

      component.createNewPassword();

      expect(component.updatePasswordForm.valid).toBeTrue();
      expect(resetPasswordServiceSpy.createNewPassword).toHaveBeenCalledWith('newPassword', 'email@email.com');
    });

    it('deve chamar o serviço de criação da nova senha e tratar o erro se houver', () => {

      component.updatePasswordForm = component['_buildUpdatePasswordForm']();
      component.updatePasswordForm.controls['newPassword'].setValue('newPassword');
      component.email = 'email@email.com';
      resetPasswordServiceSpy.createNewPassword.and.returnValue(throwError(() => new HttpErrorResponse({})));

      component.createNewPassword();

      expect(component.updatePasswordForm.valid).toBeTrue();
      expect(resetPasswordServiceSpy.createNewPassword).toHaveBeenCalledWith('newPassword', 'email@email.com');
    });

    it('não deve chamar o serviço de criação da nova senha se o formulário estiver inválido por não preenchimento da senha', () => {

      component.updatePasswordForm = component['_buildUpdatePasswordForm']();
      component.updatePasswordForm.controls['newPassword'].setValue('');

      component.createNewPassword();

      expect(resetPasswordServiceSpy.createNewPassword).not.toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('deve emitir evento para cancelar o fluxo de redefinição de senha e voltar ao login', () => {
      const emitSpy = spyOn(component.eventBackToLogin, 'emit');

      component.cancel();

      expect(emitSpy).toHaveBeenCalled();
    });
  });
});

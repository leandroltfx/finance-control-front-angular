import { HttpErrorResponse } from '@angular/common/http';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of, throwError } from 'rxjs';

import { ValidateCodeComponent } from './validate-code.component';
import { ResetPasswordService } from '../../acl/service/reset-password.service';
import { ValidateCodeDto } from '../../../../shared/model/dto/validate-code/validate-code-dto';

describe('ValidateCodeComponent', () => {
  let component: ValidateCodeComponent;
  let fixture: ComponentFixture<ValidateCodeComponent>;
  let resetPasswordServiceSpy: jasmine.SpyObj<ResetPasswordService>;

  beforeEach(() => {

    resetPasswordServiceSpy = jasmine.createSpyObj<ResetPasswordService>('ResetPasswordService', ['validateCode']);

    TestBed.configureTestingModule({
      declarations: [
        ValidateCodeComponent
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
    fixture = TestBed.createComponent(ValidateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validateCode', () => {
    it('deve chamar o serviço de validação de código', () => {

      component.validateCodeForm = component['_buildValidateCodeForm']();
      component.validateCodeForm.controls['code'].setValue('123456');
      const validateCodeDto: ValidateCodeDto = new ValidateCodeDto('userid');
      resetPasswordServiceSpy.validateCode.and.returnValue(of(validateCodeDto));

      component.validateCode();

      expect(component.validateCodeForm.valid).toBeTrue();
      expect(resetPasswordServiceSpy.validateCode).toHaveBeenCalledWith('email@email.com', '123456');
    });

    it('deve chamar o serviço de validação de código e tratar o erro se houver', () => {

      component.validateCodeForm = component['_buildValidateCodeForm']();
      component.validateCodeForm.controls['code'].setValue('123456');
      resetPasswordServiceSpy.validateCode.and.returnValue(throwError(() => new HttpErrorResponse({})));

      component.validateCode();

      expect(component.validateCodeForm.valid).toBeTrue();
      expect(resetPasswordServiceSpy.validateCode).toHaveBeenCalledWith('email@email.com', '123456');
    });

    it('não deve chamar o serviço de validação de código se o formulário estiver inválido por não preenchimento do código', () => {

      component.validateCodeForm = component['_buildValidateCodeForm']();
      component.validateCodeForm.controls['code'].setValue('');

      component.validateCode();

      expect(resetPasswordServiceSpy.validateCode).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de validação de código se o formulário estiver inválido por conta do código com menos de seis dígitos', () => {

      component.validateCodeForm = component['_buildValidateCodeForm']();
      component.validateCodeForm.controls['code'].setValue('12345');

      component.validateCode();

      expect(resetPasswordServiceSpy.validateCode).not.toHaveBeenCalled();
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

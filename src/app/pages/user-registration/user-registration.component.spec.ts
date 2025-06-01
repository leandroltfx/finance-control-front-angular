import { Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserRegistrationComponent
      ],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registerUser', () => {

    it('deve chamar o serviço de cadastro de usuário se o formulário estiver válido', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('admin');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).toHaveBeenCalledWith('chamar o serviço de cadastro de usuário');
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário não for preenchido', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com espaços em branco no meio', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('ad min');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com espaços em branco no início', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue(' admin');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com espaços em branco no fim', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('admin ');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com caracteres especiais', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('ad#min');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com apenas números', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('12313231');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário iniciar com número', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('1asd123asd');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o email não for preenchido', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o email for inválido', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('usernameemail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se a senha não for preenchida', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se a senha não conter no mínimo 8 caracteres', () => {

      const logSpy = spyOn(console, 'log');

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12');

      component.registerUser();

      expect(logSpy).not.toHaveBeenCalled();
    });
  });

  it('deve montar o formulário de cadastro de usuário', () => {

    component.userRegistrationForm = component['_buildUserRegistrationForm']();

    expect(component.userRegistrationForm.controls['username'].hasValidator(Validators.required)).toBeTrue();
    expect(component.userRegistrationForm.controls['username'].hasValidator(component['_validatorPatternUsername'])).toBeTrue();
    expect(component.userRegistrationForm.controls['username'].hasValidator(component['_validatorMinLengthUsername'])).toBeTrue();

    expect(component.userRegistrationForm.controls['email'].hasValidator(Validators.required)).toBeTrue();
    expect(component.userRegistrationForm.controls['email'].hasValidator(component['_validatorPatternEmail'])).toBeTrue();

    expect(component.userRegistrationForm.controls['password'].hasValidator(Validators.required)).toBeTrue();
    expect(component.userRegistrationForm.controls['password'].hasValidator(component['_validatorMinLengthPassword'])).toBeTrue();
  });
});
import { Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserRegistrationComponent } from './user-registration.component';
import { UserFacadeService } from '../application/user-facade.service';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userFacadeServiceSpy: jasmine.SpyObj<UserFacadeService>;

  beforeEach(async () => {

    userFacadeServiceSpy = jasmine.createSpyObj<UserFacadeService>(['registerUser']);

    await TestBed.configureTestingModule({
      imports: [
        UserRegistrationComponent,
        BrowserAnimationsModule
      ],
    }).overrideComponent(UserRegistrationComponent, {
      set: {
        providers: [
          { provide: UserFacadeService, useValue: userFacadeServiceSpy }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registerUser', () => {

    it('deve chamar o serviço de cadastro de usuário se o formulário estiver válido', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('admin');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).toHaveBeenCalledWith('admin', 'admin@mail.com', 'admin12345');
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário não for preenchido', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com espaços em branco no meio', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('ad min');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com espaços em branco no início', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue(' admin');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com espaços em branco no fim', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('admin ');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com caracteres especiais', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('ad#min');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário estiver com apenas números', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('12313231');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o nome de usuário iniciar com número', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('1asd123asd');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o email não for preenchido', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se o email for inválido', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('usernameemail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12345');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se a senha não for preenchida', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de cadastro de usuário se a senha não conter no mínimo 8 caracteres', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();

      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('admin@mail.com');
      component.userRegistrationForm.controls['password'].setValue('admin12');

      component.registerUser();

      expect(userFacadeServiceSpy.registerUser).not.toHaveBeenCalled();
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
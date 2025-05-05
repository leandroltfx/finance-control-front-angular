import { HttpErrorResponse } from '@angular/common/http';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';

import { LoginDto } from '../../shared/model/dto/login/login-dto';
import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationService } from './acl/service/user-registration.service';
import { LoggedUserDto } from '../../shared/model/dto/logged-user/logged-user-dto';

describe('UserRegistrationComponent', () => {
  let router: Router;
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userRegistrationServiceSpy: jasmine.SpyObj<UserRegistrationService>;

  beforeEach(() => {

    userRegistrationServiceSpy = jasmine.createSpyObj<UserRegistrationService>('UserRegistrationService', ['registerUser']);

    TestBed.configureTestingModule({
      declarations: [
        UserRegistrationComponent
      ],
      imports: [
        ReactiveFormsModule,

        BrowserAnimationsModule,

        RouterTestingModule,

        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: UserRegistrationService, useValue: userRegistrationServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registerUser', () => {
    it('deve chamar o serviço de cadastro de usuário', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();
      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('password');
      const loginDto: LoginDto = new LoginDto('message', new LoggedUserDto('id', 'username', 'email'));
      userRegistrationServiceSpy.registerUser.and.returnValue(of(loginDto));

      component.registerUser();

      expect(component.userRegistrationForm.valid).toBeTrue();
      expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('username', 'email@email.com', 'password');
    });

    it('deve chamar o serviço de login e tratar o erro se houver', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();
      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('password');
      userRegistrationServiceSpy.registerUser.and.returnValue(throwError(() => new HttpErrorResponse({})));

      component.registerUser();

      expect(component.userRegistrationForm.valid).toBeTrue();
      expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('username', 'email@email.com', 'password');
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por não preenchimento do nome do usuário', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();
      component.userRegistrationForm.controls['username'].setValue('');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('password1234');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por nome de usuário fora do padrão', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();
      component.userRegistrationForm.controls['username'].setValue('user user');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('password1234');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por não preenchimento do email', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();
      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('');
      component.userRegistrationForm.controls['password'].setValue('password');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por conta de email fora do padrão', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();
      component.userRegistrationForm.controls['email'].setValue('email');
      component.userRegistrationForm.controls['password'].setValue('password');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por não preenchimento da senha', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();
      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por senha com menos de 8 caracteres', () => {

      component.userRegistrationForm = component['_buildUserRegistrationForm']();
      component.userRegistrationForm.controls['username'].setValue('username');
      component.userRegistrationForm.controls['email'].setValue('email@email.com');
      component.userRegistrationForm.controls['password'].setValue('pass');

      component.registerUser();

      expect(userRegistrationServiceSpy.registerUser).not.toHaveBeenCalled();
    });
  });

  describe('cancelUserRegistration', () => {
    it('deve rotear para a tela de login', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.cancelUserRegistration();

      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});

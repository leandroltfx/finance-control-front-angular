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

import { LoginComponent } from './login.component';
import { LoginService } from './acl/service/login.service';
import { LoginDto } from '../../shared/model/dto/login/login-dto';
import { LoggedUserDto } from '../../shared/model/dto/logged-user/logged-user-dto';

describe('LoginComponent', () => {
  let router: Router;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(() => {

    loginServiceSpy = jasmine.createSpyObj<LoginService>('LoginService', ['login']);

    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
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
        { provide: LoginService, useValue: loginServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('deve chamar o serviço de login', () => {

      component.loginForm = component['_buildLoginForm']();
      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('password');
      const loginDto: LoginDto = new LoginDto('message', new LoggedUserDto('id', 'username', 'email'));
      loginServiceSpy.login.and.returnValue(of(loginDto));

      component.login();

      expect(component.loginForm.valid).toBeTrue();
      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'password');
    });

    it('deve chamar o serviço de login e tratar o erro se houver', () => {

      component.loginForm = component['_buildLoginForm']();
      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('password');
      const loginDto: LoginDto = new LoginDto('message', new LoggedUserDto('id', 'username', 'email'));
      loginServiceSpy.login.and.returnValue(throwError(() => new HttpErrorResponse({})));

      component.login();

      expect(component.loginForm.valid).toBeTrue();
      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'password');
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por não preenchimento do email', () => {

      component.loginForm = component['_buildLoginForm']();
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['password'].setValue('password');

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por não preenchimento da senha', () => {

      component.loginForm = component['_buildLoginForm']();
      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('');

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });

    it('não deve chamar o serviço de login se o formulário estiver inválido por conta de email fora do padrão', () => {

      component.loginForm = component['_buildLoginForm']();
      component.loginForm.controls['email'].setValue('email');
      component.loginForm.controls['password'].setValue('password');

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });
  });

  describe('goToUserRegistration', () => {
    it('deve rotear para o cadastro de usuário', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.goToUserRegistration();

      expect(navigateSpy).toHaveBeenCalledWith(['/user-registration']);
    });
  });
});

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of, throwError } from 'rxjs';

import { LoginDto } from './models/dto/login-dto';
import { LoginComponent } from './login.component';
import { LoginService } from './acl/service/login.service';
import { LoggedUserDto } from './models/logged-user/logged-user-dto';

describe('LoginComponent', () => {
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
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('deve realizar o login caso email e senha tenham sido preenchidos', () => {

      const loginDto: LoginDto = new LoginDto('Login efetuado com sucesso!', new LoggedUserDto('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'username', 'email'));
      loginServiceSpy.login.and.returnValue(of(loginDto));

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'asd123');
    });

    it('deve receber o erro HTTP em caso de falha no login', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro no login.' } });
      loginServiceSpy.login.and.returnValue(throwError(() => httpErrorResponse));

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'asd123');
    });

    it('deve receber o erro HTTP em caso de falha no login e emitir a mensagem padrão caso o servidor esteja offline', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: {} });
      loginServiceSpy.login.and.returnValue(throwError(() => httpErrorResponse));

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');
      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).toHaveBeenCalledWith('email@email.com', 'asd123');
    });

    it('não deve realizar o login caso o email não tenha sido preenchido', () => {

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['password'].setValue('asd123');

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });

    it('não deve realizar o login caso a senha não tenha sido preenchida', () => {

      component.loginForm = component['_buildLoginForm']();

      component.loginForm.controls['email'].setValue('email@email.com');

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });

    it('não deve realizar o login caso email e senha não tenham sido preenchidos', () => {

      component.loginForm = component['_buildLoginForm']();

      component.login();

      expect(loginServiceSpy.login).not.toHaveBeenCalled();
    });
  });

});

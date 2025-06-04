import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of, throwError } from 'rxjs';

import { UserService } from '../acl/service/user.service';
import { UserFacadeService } from './user-facade.service';
import { MessageService } from '../../../shared/services/message/message.service';
import { UserRegistrationResponseDto } from '../domain/dto/response/user-registration-response.dto';

describe('UserFacadeService', () => {
  let service: UserFacadeService;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {

    userServiceSpy = jasmine.createSpyObj<UserService>(['registerUser']);
    messageServiceSpy = jasmine.createSpyObj<MessageService>(['showErrorMessage', 'showSuccessMessage']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        UserFacadeService,
        { provide: UserService, useValue: userServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    });
    service = TestBed.inject(UserFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {

    it('deve chamar a service passando os dados preenchidos no formulário de cadastro de usuário', () => {

      const userRegistrationResponseDto: UserRegistrationResponseDto = {
        message: 'Usuário cadastrado com sucesso!'
      };
      userServiceSpy.registerUser.and.returnValue(of(userRegistrationResponseDto));

      service.registerUser(
        'admin',
        'admin@email.com',
        'admin123'
      );

      expect(userServiceSpy.registerUser).toHaveBeenCalled();
      expect(messageServiceSpy.showSuccessMessage).toHaveBeenCalledWith('Usuário cadastrado com sucesso!');
    });

    it('deve tratar erro após chamar a service e disparar a mensagem retornada', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro.' } });
      userServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

      service.registerUser(
        'admin',
        'admin@email.com',
        'admin123'
      );

      expect(userServiceSpy.registerUser).toHaveBeenCalled();
      expect(messageServiceSpy.showErrorMessage).toHaveBeenCalledWith('Ocorreu um erro.');
    });

    it('deve tratar erro após chamar a service e disparar a mensagem padrão caso não retorne mensagem de erro', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: {} });
      userServiceSpy.registerUser.and.returnValue(throwError(() => httpErrorResponse));

      service.registerUser(
        'admin',
        'admin@email.com',
        'admin123'
      );

      expect(userServiceSpy.registerUser).toHaveBeenCalled();
      expect(messageServiceSpy.showErrorMessage).toHaveBeenCalledWith('Ocorreu um erro inesperado, tente novamente mais tarde.');
    });

  });
});

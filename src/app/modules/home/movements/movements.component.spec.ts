import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableModule } from '@angular/material/table';

import { of, throwError } from 'rxjs';

import { MovementsComponent } from './movements.component';
import { MovementsService } from './acl/service/movements.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoggedUserDto } from '../../login/models/logged-user/logged-user-dto';

describe('MovementsComponent', () => {
  let component: MovementsComponent;
  let fixture: ComponentFixture<MovementsComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let movementsServiceSpy: jasmine.SpyObj<MovementsService>;

  beforeEach(() => {

    movementsServiceSpy = jasmine.createSpyObj<MovementsService>('MovementsService', ['getMovements']);
    // Criando um spy para o AuthService
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['loggedUser']);

    // Definindo getter e setter para o loggedUser no AuthService mockado
    Object.defineProperty(authServiceSpy, 'loggedUser', {
      get: () => authServiceSpy['_loggedUser'],  // getter retorna o valor armazenado
      set: (loggedUser: LoggedUserDto | null) => authServiceSpy['_loggedUser'] = loggedUser,  // setter define o valor
    });

    authServiceSpy['_loggedUser'] = { id: 'userId', email: 'email@email.com', userName: 'userName' };  // inicializa loggedUser como null

    TestBed.configureTestingModule({
      declarations: [MovementsComponent],
      imports: [
        MatTableModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MovementsService, useValue: movementsServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(MovementsComponent);
    component = fixture.componentInstance;
    movementsServiceSpy.getMovements.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('_getMovements', () => {

    it('deve retornar a lista de movimentações', () => {

      component.getMovements();

      expect(movementsServiceSpy.getMovements).toHaveBeenCalledWith('userId');
      expect(component.movementsDto.length).toBe(0);
    });

    it('deve receber o erro HTTP em caso de falha na listagem de movimentações e apresentar mensagem vinda do back', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro listagem de movimentações.' } });
      movementsServiceSpy.getMovements.and.returnValue(throwError(() => httpErrorResponse));

      component.getMovements();

      expect(movementsServiceSpy.getMovements).toHaveBeenCalledWith('userId');
      expect(component.errorMessage).toBe('Ocorreu um erro listagem de movimentações.');
    });

    it('deve receber o erro HTTP em caso de falha na listagem de movimentações e apresentar mensagem padrão caso o back esteja indisponível', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: {} });
      movementsServiceSpy.getMovements.and.returnValue(throwError(() => httpErrorResponse));

      component.getMovements();

      expect(movementsServiceSpy.getMovements).toHaveBeenCalledWith('userId');
      expect(component.errorMessage).toBe('Servidor indisponível. Tente novamente mais tarde.');
    });
  });
});

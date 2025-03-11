import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { BankAccountsComponent } from './bank-accounts.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { BankAccountsService } from './acl/service/bank-accounts.service';
import { LoggedUserDto } from '../../login/models/logged-user/logged-user-dto';

describe('BankAccountsComponent', () => {
  let component: BankAccountsComponent;
  let fixture: ComponentFixture<BankAccountsComponent>;
  let bankAccountsServiceSpy: jasmine.SpyObj<BankAccountsService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {

    bankAccountsServiceSpy = jasmine.createSpyObj<BankAccountsService>('BankAccountsService', ['getBankAccounts']);
    // Criando um spy para o AuthService
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['loggedUser']);

    // Definindo getter e setter para o loggedUser no AuthService mockado
    Object.defineProperty(authServiceSpy, 'loggedUser', {
      get: () => authServiceSpy['_loggedUser'],  // getter retorna o valor armazenado
      set: (loggedUser: LoggedUserDto | null) => authServiceSpy['_loggedUser'] = loggedUser,  // setter define o valor
    });

    authServiceSpy['_loggedUser'] = { id: 'userId', email: 'email@email.com', userName: 'userName' };  // inicializa loggedUser como null

    TestBed.configureTestingModule({
      declarations: [BankAccountsComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: BankAccountsService, useValue: bankAccountsServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(BankAccountsComponent);
    component = fixture.componentInstance;
    bankAccountsServiceSpy.getBankAccounts.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('_getBankAccounts', () => {

    it('deve retornar a lista de contas bancárias', () => {

      component['_getBankAccounts']();

      expect(bankAccountsServiceSpy.getBankAccounts).toHaveBeenCalledWith('userId');
      expect(component.bankAccountsDto.length).toBe(0);
    });

    it('deve receber o erro HTTP em caso de falha na listagem de contas bancárias', () => {

      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { message: 'Ocorreu um erro listagem de contas bancárias.' } });
      bankAccountsServiceSpy.getBankAccounts.and.returnValue(throwError(() => httpErrorResponse));

      component['_getBankAccounts']();

      expect(bankAccountsServiceSpy.getBankAccounts).toHaveBeenCalledWith('userId');
    });
  });
});

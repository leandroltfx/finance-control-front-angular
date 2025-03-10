import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { homeGuard } from './home.guard';
import { AuthService } from '../../services/auth/auth.service';
import { LoggedUserDto } from 'src/app/modules/login/models/logged-user/logged-user-dto';
import { RoutesEnum } from 'src/app/shared/enum/routes.enum';

describe('homeGuard', () => {

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => homeGuard(...guardParameters));

  beforeEach(() => {
    // Criando um spy para o AuthService
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['loggedUser']);

    // Definindo getter e setter para o loggedUser no AuthService mockado
    Object.defineProperty(authServiceSpy, 'loggedUser', {
      get: () => authServiceSpy['_loggedUser'],  // getter retorna o valor armazenado
      set: (loggedUser: LoggedUserDto | null) => authServiceSpy['_loggedUser'] = loggedUser,  // setter define o valor
    });

    authServiceSpy['_loggedUser'] = null;  // inicializa loggedUser como null
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('deve permitir acesso a home se o usuário estiver autenticado', () => {

    authServiceSpy.loggedUser = new LoggedUserDto('userName', 'email@email.com');

    const result = executeGuard(route, state);
    expect(result).toBeTrue();
  });

  it('deve redirecionar para "/login" se o usuário não estiver autenticado', () => {
    authServiceSpy.loggedUser = null;

    const result = executeGuard(route, state);
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith([RoutesEnum.LOGIN]);
  });
});

import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { CoreModule } from '../../core.module';
import { LoggedUserDto } from '../../../features/login/models/logged-user/logged-user-dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loggedUser', () => {
    it('deve receber e alterar o valor de loggedUser', () => {

      const user1 = new LoggedUserDto('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'admin', 'admin@email.com');
      const user2 = new LoggedUserDto('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'user', 'user@email.com');

      service.loggedUser = user1;

      expect(service.loggedUser.userName).toBe('admin');
      expect(service.loggedUser.email).toBe('admin@email.com');

      service.loggedUser = user2;

      expect(service.loggedUser.userName).toBe('user');
      expect(service.loggedUser.email).toBe('user@email.com');
    });
  });
});

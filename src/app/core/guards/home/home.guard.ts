import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RoutesEnum } from '../../../shared/enum/routes.enum';
import { AuthService } from '../../services/auth/auth.service';
import { LoggedUserDto } from '../../../modules/login/models/logged-user/logged-user-dto';

// Functional Guards
export const homeGuard: CanActivateFn = () => {

  const loggedUser: LoggedUserDto | null = inject(AuthService).loggedUser;
  const router = inject(Router);

  if (loggedUser) {
    return true;
  } else {
    router.navigate([RoutesEnum.LOGIN]);
    return false;
  }
};

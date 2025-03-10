import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { LoggedUserDto } from '../../../modules/login/models/logged-user/logged-user-dto';
import { RoutesEnum } from 'src/app/shared/enum/routes.enum';

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

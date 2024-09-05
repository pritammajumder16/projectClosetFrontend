import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const CanActivate: CanActivateFn = () => {
  const _authService = inject(AuthServiceService);
  if (_authService.getData().token) {
    return true;
  }
  const router = inject(Router);
  router.navigate(['/auth/login']);
  return false;
};
export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return CanActivate(route, state);
};

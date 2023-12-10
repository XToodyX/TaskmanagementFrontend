import {inject} from '@angular/core';
import {AuthService} from '../auth.service';
import {CanActivateFn, Router} from '@angular/router';


export function authenticationGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (!authService.isLoggedIn()) {
      router.navigate(['./login']).then(() => {});
      return false;
    }
    return true;
  };
}

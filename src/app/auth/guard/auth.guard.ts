import {inject} from '@angular/core';
import {AuthService} from '../auth.service';
import {CanActivateFn} from '@angular/router';


export function authenticationGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);

    return authService.isLoggedIn();
  };
}

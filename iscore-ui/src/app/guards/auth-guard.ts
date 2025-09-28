
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// IMPORTANT: You MUST verify this path is correct for your project structure.
import { AuthService } from '../services/auth/auth';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Because the AuthService can now be found, authService is correctly typed
  // and this call will no longer cause an error.
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

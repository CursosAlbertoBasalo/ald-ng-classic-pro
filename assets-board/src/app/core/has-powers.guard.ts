import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hasPowersGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const hasPowers = Math.random() > 0.5;
  console.log('Has powers:', hasPowers);

  if (hasPowers) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

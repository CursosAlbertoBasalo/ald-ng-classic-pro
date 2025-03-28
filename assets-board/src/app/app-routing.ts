import { Routes } from '@angular/router';
import { hasPowersGuard } from './core/has-powers.guard';
import { ratesResolver } from './routes/rates/rates.resolver';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('./routes/assets/assets-routing').then((m) => m.ASSETS_ROUTES),
  },
  {
    path: 'symbols',
    canActivate: [hasPowersGuard],
    loadComponent: () => import('./routes/symbols/symbols.component'),
  },
  {
    path: 'rates',
    resolve: { rates: ratesResolver },
    loadComponent: () => import('./routes/rates/rates.component'),
  },
];

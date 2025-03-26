import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('./routes/assets/assets.module').then((m) => m.AssetsModule),
  },
  {
    path: 'symbols',
    loadComponent: () =>
      import('./routes/symbols/symbols.component').then(
        (m) => m.SymbolsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

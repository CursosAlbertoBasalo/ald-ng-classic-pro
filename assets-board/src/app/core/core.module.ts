import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssetsEffects } from '../shared/assets/asset-effects.service';
import { HeaderComponent } from './layout/header/header.component';
import { ThemeToggleComponent } from './layout/theme-toggle/theme-toggle.component';

@NgModule({
    imports: [CommonModule, HttpClientModule, RouterModule, HeaderComponent, ThemeToggleComponent],
    exports: [HeaderComponent],
})
export class CoreModule {
  constructor(assets: AssetsEffects) {
    console.log('CoreModule loaded');
    assets.configForRoot();
  }
}

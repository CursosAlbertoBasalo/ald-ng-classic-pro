import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { ThemeToggleComponent } from './layout/theme-toggle/theme-toggle.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }

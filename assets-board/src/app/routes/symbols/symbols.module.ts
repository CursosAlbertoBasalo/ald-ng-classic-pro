import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SymbolsRoutingModule } from './symbols-routing.module';
import { SymbolsComponent } from './symbols.component';


@NgModule({
  declarations: [
    SymbolsComponent
  ],
  imports: [
    CommonModule,
    SymbolsRoutingModule
  ]
})
export class SymbolsModule { }

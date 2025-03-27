import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageComponent } from 'src/app/shared/ui/page/page.component';
import { RatesRoutingModule } from './rates-routing.module';
import { RatesComponent } from './rates.component';

@NgModule({
  declarations: [RatesComponent],
  imports: [CommonModule, RatesRoutingModule, PageComponent],
})
export class RatesModule {}

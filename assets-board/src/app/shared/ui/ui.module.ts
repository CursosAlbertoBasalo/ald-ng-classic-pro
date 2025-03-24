import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    PageComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageComponent,
    DetailsComponent
  ]
})
export class UiModule { }

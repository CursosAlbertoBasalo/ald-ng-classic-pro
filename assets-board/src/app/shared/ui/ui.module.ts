import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';



@NgModule({
    imports: [
        CommonModule,
        PageComponent,
        DetailsComponent,
        SearchComponent
    ],
    exports: [
        PageComponent,
        DetailsComponent,
        SearchComponent
    ]
})
export class UiModule { }

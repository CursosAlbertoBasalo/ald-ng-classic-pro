import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { PageComponent } from '../../shared/ui/page/page.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { HomeService } from './home.service';

@Component({
  selector: 'lab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [PageComponent, AssetsListComponent, RouterLink, AsyncPipe],
})
export class HomeComponent {
  private homeService: HomeService = inject(HomeService);
  protected assets$: Observable<Asset[]> = this.homeService.getAssets$();
  protected categories$: Observable<Category[]> =
    this.homeService.getCategories$();
}

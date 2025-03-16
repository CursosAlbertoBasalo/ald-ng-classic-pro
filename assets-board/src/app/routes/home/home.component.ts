import { Component } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { AssetsRepository } from 'src/app/shared/assets.repository';
import { CategoriesRepositoryService } from 'src/app/shared/categories.repository';

@Component({
  selector: 'lab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public assets: Asset[] = [];
  public categories: Category[] = [];

  protected categoryName = (asset: Asset) => {
    const category = this.categories.find(
      (category) => category.id === asset.categoryId
    );
    return category ? category.name : 'Unknown';
  };

  constructor(
    private assetsRepository: AssetsRepository,
    private categoriesRepository: CategoriesRepositoryService
  ) {
    this.assetsRepository.getAll$().subscribe((assets) => {
      this.assets = assets;
    });
    this.categoriesRepository.getAll$().subscribe((categories) => {
      this.categories = categories;
    });
  }
}

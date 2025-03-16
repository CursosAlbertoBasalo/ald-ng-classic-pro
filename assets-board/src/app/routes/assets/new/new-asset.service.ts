import { Injectable } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { AssetsRepository } from 'src/app/shared/assets.repository';
import { CategoriesRepository } from 'src/app/shared/categories.repository';

@Injectable({
  providedIn: 'root',
})
export class NewAssetService {
  constructor(
    private assets: AssetsRepository,
    private categories: CategoriesRepository
  ) {}

  loadCategories$() {
    return this.categories.getAll$();
  }

  saveAsset(asset: Asset) {
    this.assets.post$(asset).subscribe();
  }
}

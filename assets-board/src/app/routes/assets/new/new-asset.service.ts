import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { AssetsStoreService } from 'src/app/shared/assets-store.service';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';

@Injectable({
  providedIn: 'root',
})
export class NewAssetService {
  constructor(
    private categories: CategoriesRepositoryService,
    private assetsStore: AssetsStoreService
  ) {}

  loadCategories$(): Observable<Category[]> {
    return this.categories.getAll$();
  }

  saveAsset(asset: Asset): void {
    this.assetsStore.dispatchAddAsset(asset);
    this.assetsStore.dispatch({ type: 'ADD_ASSET', payload: asset });
  }
}

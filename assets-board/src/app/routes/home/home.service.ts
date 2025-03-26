import { inject, Injectable } from '@angular/core';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private assetsStore = inject(AssetsStoreService);
  private categoriesRepository = inject(CategoriesRepositoryService);

  constructor() {
    this.assetsStore.dispatch({ type: 'LOAD_ASSETS', payload: null });
  }

  getAssets$() {
    return this.assetsStore.selectAssets$();
  }

  getCategories$() {
    return this.categoriesRepository.getAll$();
  }
}

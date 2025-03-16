import { Injectable } from '@angular/core';
import { AssetsRepository } from 'src/app/shared/assets.repository';
import { CategoriesRepositoryService } from 'src/app/shared/categories.repository';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private assetsRepository: AssetsRepository,
    private categoriesRepository: CategoriesRepositoryService
  ) {}

  getAssets$() {
    return this.assetsRepository.getAll$();
  }

  getCategories$() {
    return this.categoriesRepository.getAll$();
  }
}

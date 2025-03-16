import { Injectable } from '@angular/core';
import { AssetsRepositoryService } from 'src/app/shared/assets-repository.service';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private assetsRepository: AssetsRepositoryService,
    private categoriesRepository: CategoriesRepositoryService
  ) {}

  getAssets$() {
    return this.assetsRepository.getAll$();
  }

  getCategories$() {
    return this.categoriesRepository.getAll$();
  }
}

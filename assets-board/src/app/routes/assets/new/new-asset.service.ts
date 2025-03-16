import { Injectable } from '@angular/core';
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

  getCategories$() {
    return this.categories.getAll$();
  }
}

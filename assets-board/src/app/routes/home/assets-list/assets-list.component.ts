import { Component, Input } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';

@Component({
  selector: 'lab-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.css'],
})
export class AssetsListComponent {
  @Input() public assets: Asset[] = [];
  @Input() public categories: Category[] = [];

  protected categoryName = (asset: Asset) => {
    const category = this.categories.find(
      (category) => category.id === asset.categoryId
    );
    return category ? category.name : 'Unknown';
  };
}

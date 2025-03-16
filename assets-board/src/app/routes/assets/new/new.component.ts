import { Component } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { NewAssetService } from './new-asset.service';

@Component({
  selector: 'lab-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  protected categories$ = this.newAsset.loadCategories$();

  constructor(private newAsset: NewAssetService) {}

  saveAsset(asset: Asset) {
    this.newAsset.saveAsset(asset);
  }
}

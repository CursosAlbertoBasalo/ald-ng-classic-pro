import { Component } from '@angular/core';
import { NewAssetService } from './new-asset.service';

@Component({
  selector: 'lab-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  protected categories$ = this.newAsset.getCategories$();

  constructor(private newAsset: NewAssetService) {}
}

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { PageComponent } from '../../../shared/ui/page/page.component';
import { NewAssetFormComponent } from './new-asset-form/new-asset-form.component';
import { NewAssetService } from './new-asset.service';

/**
 * Routed component to add a new asset
 */
@Component({
  selector: 'lab-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageComponent, NewAssetFormComponent, AsyncPipe],
})
export class NewComponent {
  private newAsset = inject(NewAssetService);
  protected categories$ = this.newAsset.loadCategories$();
  protected symbols$ = this.newAsset.loadSymbols$();

  saveAsset(asset: Asset) {
    this.newAsset.saveAsset(asset);
  }
}

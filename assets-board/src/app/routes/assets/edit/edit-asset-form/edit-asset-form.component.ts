import { AsyncPipe, CurrencyPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { AssetDetailsService } from 'src/app/shared/assets/asset-details.service';
import { DetailsComponent } from '../../../../shared/ui/details/details.component';

@Component({
  selector: 'lab-edit-asset-form',
  templateUrl: './edit-asset-form.component.html',
  styleUrls: ['./edit-asset-form.component.css'],
  standalone: true,
  imports: [DetailsComponent, ReactiveFormsModule, AsyncPipe, CurrencyPipe],
})
export class EditAssetFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private assetDetailsService = inject(AssetDetailsService);

  public asset = input.required<Asset>();

  @Output() public update: EventEmitter<Asset> = new EventEmitter();
  @Output() public delete: EventEmitter<void> = new EventEmitter();

  protected form: FormGroup = this.fb.group({
    quantity: [0, [Validators.required, Validators.min(0)]],
  });

  protected assetDetails$: Observable<any> = of(null);

  ngOnInit() {
    if (!this.asset()) return;
    this.form.patchValue({ quantity: this.asset().quantity });
    // Load asset details
    this.assetDetails$ = this.assetDetailsService.getAssetDetails$(
      this.asset().categoryId,
      this.asset().symbol
    );
  }

  onSubmit() {
    const updatedAsset: Asset = {
      ...this.asset(),
      quantity: this.form.value.quantity,
    };
    this.update.emit(updatedAsset);
  }

  onDelete() {
    this.delete.emit();
  }
}

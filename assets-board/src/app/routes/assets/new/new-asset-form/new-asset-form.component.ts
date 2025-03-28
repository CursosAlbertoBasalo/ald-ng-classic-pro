import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Asset, NULL_ASSET } from 'src/app/domain/asset.type';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { Category } from 'src/app/domain/category.type';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';
import {
  evenValidator,
  maxInvestmentValidator,
  symbolValidator,
} from 'src/app/shared/custom.validations';

/**
 * Presentational component with a form to add a new asset
 */
@Component({
  selector: 'lab-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: ['./new-asset-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export class NewAssetFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private assetsStore = inject(AssetsStoreService);

  public categories = input<Category[]>([]);
  public categoriesSymbols = input<CategorySymbolVO[]>([]);
  @Output() public save: EventEmitter<Asset> = new EventEmitter();

  protected categorySymbols: CategorySymbolVO[] = [];
  protected existingAssetForSymbol: Asset | null = null;
  protected isRealEstate = false;

  protected form: FormGroup = this.fb.group(
    {
      categoryId: new FormControl(0, [Validators.required]),
      symbol: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [symbolValidator(this.assetsStore)],
        updateOn: 'change',
      }),
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [
        Validators.required,
        Validators.min(0),
        evenValidator,
      ]),
      value: new FormControl(1, [Validators.required, Validators.min(0)]),
    },
    {
      validators: [maxInvestmentValidator(1000000)],
    } as AbstractControlOptions
  );

  ngOnInit() {
    this.getControl('categoryId').valueChanges.subscribe((categoryId) =>
      this.onCategoryChange(categoryId)
    );

    this.getControl('symbol').valueChanges.subscribe((symbol) =>
      this.onSymbolChange(symbol)
    );
  }

  private onCategoryChange(categoryId: number): void {
    const numericCategoryId = Number(categoryId);
    this.categorySymbols = this.categoriesSymbols().filter(
      (symbol) => symbol.categoryId === numericCategoryId
    );
    this.isRealEstate = numericCategoryId === 2; // Flat/Real Estate category

    // Reset symbol when category changes
    this.getControl('symbol').setValue('');
    this.existingAssetForSymbol = null;

    // Handle field behavior based on category
    if (this.isRealEstate) {
      this.getControl('name').enable();
      this.getControl('value').enable();
    } else {
      this.getControl('name').disable();
      this.getControl('value').disable();
    }
  }

  private onSymbolChange(symbol: string): void {
    if (!symbol) return;
    if (this.isRealEstate) return;
    // For non-real estate, look up symbol info and populate fields
    const categorySymbolVO = this.categorySymbols.find(
      (s) => s.symbol === symbol
    );
    if (!categorySymbolVO) return;
    this.getControl('name').setValue(categorySymbolVO.symbol);
    this.getControl('value').setValue(categorySymbolVO.value);
  }

  protected onSubmit() {
    const asset: Asset = {
      id: 0,
      name: this.getValue('name'),
      categoryId: this.getValue('categoryId'),
      symbol: this.getValue('symbol'),
      quantity: this.getValue('quantity'),
      value: this.getValue('value'),
    };
    this.save.emit(asset);
    this.form.reset(NULL_ASSET);
  }

  protected getControl(controlName: string): AbstractControl {
    return this.form.get(controlName) as AbstractControl;
  }

  protected isInvalid(controlName: string): boolean {
    return this.getControl(controlName).invalid;
  }

  protected getErrors(controlName?: string): ValidationErrors | null {
    if (!controlName) return this.form.errors;
    return this.getControl(controlName).errors;
  }

  protected getValue(controlName: string): any {
    return this.getControl(controlName).value;
  }
}

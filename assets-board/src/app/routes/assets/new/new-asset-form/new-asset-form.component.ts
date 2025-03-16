import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';

@Component({
  selector: 'lab-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: ['./new-asset-form.component.css'],
})
export class NewAssetFormComponent {
  @Input() public categories: Category[] = [];
  @Output() public save: EventEmitter<Asset> = new EventEmitter();

  protected form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(0)]],
    value: [1, [Validators.required, Validators.min(0)]],
    symbol: [''],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}

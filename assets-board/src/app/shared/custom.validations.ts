import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AssetsStoreService } from './assets/assets-store.service';

export function evenValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const isValid = value % 2 === 0;
  if (isValid) return null;
  const error: ValidationErrors = {
    even: `${value} is not an even number`,
  };
  return error;
}

export function maxInvestmentValidator(maxInvestment: number) {
  const validatorFn: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    const quantity = form.get('quantity')?.value;
    const value = form.get('value')?.value;
    const investment = quantity * value;
    if (investment <= maxInvestment) return null;
    const error: ValidationErrors = {
      maxInvestment: `Investment ${investment} is greater than ${maxInvestment}`,
    };
    return error;
  };
  return validatorFn;
}

export function symbolValidator(
  assetsStore: AssetsStoreService
): AsyncValidatorFn {
  const validatorFn: AsyncValidatorFn = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const symbol = control.value;
    control.setErrors(null);
    return assetsStore.selectAssetBySymbol$(symbol).pipe(
      map((asset) => {
        const isValid = !asset || !asset.id;
        if (isValid) return null;
        const errors = { symbolExists: `Symbol ${symbol} already exists` };
        control.setErrors(errors);
        return errors;
      })
    );
  };
  return validatorFn;
}

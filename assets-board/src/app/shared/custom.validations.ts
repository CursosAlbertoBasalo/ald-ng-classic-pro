import { AbstractControl, ValidationErrors } from '@angular/forms';

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

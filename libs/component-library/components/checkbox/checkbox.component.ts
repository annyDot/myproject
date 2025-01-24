/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  id = input('');
  labelTxt = input('');

  disabled = model(false);
  private _checked = false;

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    if (!this.disabled) {
      this._checked = value;
      this.onChange(value);
    }
  }

  writeValue(value: any): void {
    this._checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  toggleChecked(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onTouched();
    }
  }
}

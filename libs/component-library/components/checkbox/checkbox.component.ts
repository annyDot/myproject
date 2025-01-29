/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
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
  trueValue = input<string | boolean>(true);
  falseValue = input<string | boolean>(false);
  labelTxt = input('');

  private _value: string | boolean = false;
  isDisabled = false;

  onChange = (value: string | boolean) => {};
  onTouched = () => {};

  get value(): string | boolean {
    return this._value;
  }

  set value(val: string | boolean) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
      this.onTouched();
    }
  }

  writeValue(value: string | boolean): void {
    this._value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  toggle(): void {
    this.value =
      this._value === this.trueValue() ? this.falseValue() : this.trueValue();
  }
}

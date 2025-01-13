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

type InputType =
  | 'text'
  | 'number'
  | 'search'
  | 'password'
  | 'email'
  | 'tel'
  | 'url'
  | 'date'
  | 'time'
  | 'color';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  type = input<InputType>('text');
  placeholder = input('');
  disabled = model(false);
  value = model('');

  onChange = () => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value.set(value);
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
}

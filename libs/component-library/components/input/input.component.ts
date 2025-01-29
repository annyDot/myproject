/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
  output,
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
  id = input('');
  labelTxt = input('');
  placeholder = input('');
  disabled = model(false);
  invalid = input(false);
  errorMessage = input('');
  value = model('');
  output = output<string>();

  onChange = (v: string) => {};
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

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.writeValue(inputElement.value);
    this.onChange(this.value());
    this.output.emit(this.value());
  }
}

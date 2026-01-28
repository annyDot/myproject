import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonClass = 'primary' | 'secondary' | 'danger' | 'info';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  class = input<ButtonClass>('primary');
  type = input<ButtonType>('button');
  disabled = input(false);
}

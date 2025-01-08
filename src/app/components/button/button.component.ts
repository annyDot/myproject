import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'danger' | 'info';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [CommonModule]
})
export class ButtonComponent {
  type = input<ButtonType>('primary');
  disabled = input(false);
}

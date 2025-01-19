import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ModalButton, ModalEvent } from './interface/modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [CommonModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  data = input();
  title = input('');
  width = input(400);
  height = input(600);
  buttons = input<ModalButton[]>([]);
  events = output<ModalEvent>();

  onButtonClick(event: ModalEvent): void {
    const { type, data } = event;
    this.events.emit({ type, data });
  }

  getButtonLabel(button: ModalButton): string {
    switch (button.type) {
      case 'ok':
        return button.label || 'Ok';
      case 'save':
        return button.label || 'Save';
      case 'cancel':
        return button.label || 'Cancel';
      default:
        return '';
    }
  }

  close(): void {
    this.events.emit({ type: 'cancel' });
  }
}

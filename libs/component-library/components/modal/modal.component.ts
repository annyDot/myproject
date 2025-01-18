import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { ModalService } from 'apps/myproject/src/app/shared/services/modal.service';
import { ButtonComponent } from '../button/button.component';

export interface ModalEvent {
  eventType: 'save' | 'cancel' | 'ok';
  data?: any;
}

export interface ModalButton {
  type: 'save' | 'ok' | 'cancel';
  label?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [CommonModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  private modalService = inject(ModalService);
  data = input();
  title = input('');
  width = input(400);
  height = input(600);
  buttons = input<ModalButton[]>([]);
  okEvent = output();
  saveEvent = output();
  cancelEvent = output();

  onButtonClick(eventType: 'save' | 'ok' | 'cancel', data: any): void {
    const modalEvent: ModalEvent = { eventType, data };

    switch (eventType) {
      case 'save':
        this.saveEvent.emit(data);
        break;
      case 'ok':
        this.okEvent.emit(data);
        break;
      case 'cancel':
        this.cancelEvent.emit();
        break;
    }

    // this.modalService.emitModalEvent(modalEvent);
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
    this.cancelEvent.emit();
  }
}

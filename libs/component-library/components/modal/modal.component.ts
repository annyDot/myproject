import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  EventEmitter,
  InjectionToken,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ModalConfig, ModalEvent } from './interface/modal.interface';

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [CommonModule, ButtonComponent, IconComponent],
})
export class ModalComponent {
  @Input() component!: any;
  @Input() config: Partial<ModalConfig> = { width: 400, height: 600 };
  @Output() modalEvent = new EventEmitter<ModalEvent>();
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  private viewContainerRef!: ViewContainerRef;

  ngAfterViewInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentRef: ComponentRef<any> =
      this.viewContainerRef.createComponent(this.component);

    if (this.config?.componentInputs) {
      Object.entries(this.config.componentInputs).forEach(([key, value]) => {
        componentRef.instance[key] = value;
      });
    }

    componentRef.changeDetectorRef.detectChanges();
  }

  onClose() {
    this.modalEvent.emit({ type: 'cancel' });
  }

  onBtnClick(type: ModalEvent['type']) {
    this.modalEvent.emit({ type });
  }
}

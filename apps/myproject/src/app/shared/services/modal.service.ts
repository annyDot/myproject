import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayRef: OverlayRef | null = null;
  #overlay = inject(Overlay);
  #injector = inject(Injector);

  open(component: any): void {
    this.close();

    this.overlayRef = this.#overlay.create({
      hasBackdrop: true,
      backdropClass: 'modal-backdrop',
      panelClass: 'modal-panel',
      scrollStrategy: this.#overlay.scrollStrategies.block(),
    });

    const componentPortal = new ComponentPortal(
      component,
      null,
      this.#injector
    );
    this.overlayRef.attach(componentPortal);

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}

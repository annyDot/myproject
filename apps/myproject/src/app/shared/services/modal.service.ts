import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DestroyRef, inject, Injectable, Injector } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalEvent, ModalOptions } from '@component-library/components';
import { isObservable, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayRef: OverlayRef | null = null;
  private eventSubject = new Subject<ModalEvent>();
  events$ = this.eventSubject.asObservable();

  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  open(component: any, options: ModalOptions): Observable<ModalEvent> {
    this.close();

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'modal-backdrop',
      panelClass: 'modal-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const componentPortal = new ComponentPortal(component, null, this.injector);
    const componentRef = this.overlayRef.attach(componentPortal);

    const instance = componentRef.instance as any;

    Object.keys(options).forEach((key) => {
      if (key in instance) {
        instance[key] = options[key];
      }
    });

    if (isObservable(instance.events)) {
      instance.events
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event: ModalEvent) => {
          this.eventSubject.next(event);
          this.close();
        });
    }

    this.overlayRef
      .backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.close();
      });

    return this.events$;
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}

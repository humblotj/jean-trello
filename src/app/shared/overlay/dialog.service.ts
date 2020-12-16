import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { DialogRef } from './dialog-ref';
import { OverlayComponent } from './overlay.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) { }

  open<R = any, T = any>(
    content: Type<any>,
    data?: T
  ): DialogRef<R> {
    const configs = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().top(),
      hasBackdrop: false,
      panelClass: 'modal',
    });

    const overlayRef = this.overlay.create(configs);

    const dialogRef = new DialogRef<R, T>(overlayRef, content, data);

    const injector = this.createInjector(dialogRef, this.injector);
    overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));

    return dialogRef;
  }

  createInjector(ref: DialogRef, inj: Injector): Injector {
    return Injector.create({
      parent: inj,
      providers: [
        { provide: DialogRef, useValue: ref }
      ]
    });
  }
}

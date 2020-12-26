import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable, Injector, Type } from '@angular/core';
import { CardEditComponent } from 'src/app/board/card/card-edit/card-edit.component';
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
    const componentRef = overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));
    componentRef.instance.type = 'dialog';

    return dialogRef;
  }

  openCardEdit<R = any, T = any>(
    reference: ElementRef,
    data?: T
  ): DialogRef<R> {
    const configs = new OverlayConfig({
      positionStrategy: this.overlay.position().flexibleConnectedTo(reference).withPositions([{
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top'
      }]),
      hasBackdrop: false,
      panelClass: 'card-edit',
    });

    const overlayRef = this.overlay.create(configs);

    const dialogRef = new DialogRef<R, T>(overlayRef, CardEditComponent, data);

    const injector = this.createInjector(dialogRef, this.injector);
    const componentRef = overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));
    componentRef.instance.type = 'card-edit';

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

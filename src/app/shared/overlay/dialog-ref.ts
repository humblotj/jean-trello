import { Subject } from 'rxjs';

import { OverlayRef } from '@angular/cdk/overlay';

import { Type } from '@angular/core';

export interface OverlayCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data: R;
}

// R = Response Data Type, T = Data passed to Modal Type
export class DialogRef<R = any, T = any> {
  afterClosed$ = new Subject<R | undefined>();

  constructor(
    public overlay: OverlayRef,
    public content: Type<any>,
    public data?: T
  ) {
    overlay.backdropClick().subscribe(() => this._close());
  }

  close(data?: R): void {
    this._close(data);
  }

  private _close(data?: R | undefined): void {
    this.overlay.detach();
    this.overlay.dispose();
    this.afterClosed$.next(data);
    this.afterClosed$.complete();
  }
}

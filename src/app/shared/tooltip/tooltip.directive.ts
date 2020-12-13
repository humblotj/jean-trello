import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') text = '';
  private overlayRef: OverlayRef | undefined;

  constructor(private overlay: Overlay, private el: ElementRef) { }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  createOverlay(): OverlayRef {
    if (this.overlayRef) {
      return this.overlayRef;
    }
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.el)
      .withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    return this.overlayRef;
  }

  @HostListener('mouseenter')
  show(): void {
    const overlayRef = this.createOverlay();
    const tooltipRef: ComponentRef<TooltipComponent>
      = overlayRef.attach(new ComponentPortal(TooltipComponent));
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseleave')
  hide(): void {
    this.overlayRef?.detach();
  }
}

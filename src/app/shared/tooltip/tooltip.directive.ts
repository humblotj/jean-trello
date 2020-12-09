import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') text = '';
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private el: ElementRef) { }

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.el)
      .withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        // offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show(): void {
    const tooltipRef: ComponentRef<TooltipComponent>
      = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseleave')
  hide(): void {
    this.overlayRef.detach();
  }
}

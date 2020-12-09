import {
  Component, ChangeDetectionStrategy, Input,
  ViewChild, HostListener, ViewContainerRef, TemplateRef, ViewEncapsulation, ElementRef
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent {
  @Input() reference!: ElementRef;

  @ViewChild('dropdown') contentTemplate!: TemplateRef<any>;

  private overlayRef: OverlayRef | undefined;

  showing = false;

  constructor(private overlay: Overlay, private viewcontainerRef: ViewContainerRef) {
  }

  show(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(new TemplatePortal(this.contentTemplate, this.viewcontainerRef));
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
  }

  hide(): void {
    this.overlayRef?.detach();
    this.showing = false;
  }

  @HostListener('window:resize')
  onWinResize(): void {
    this.syncWidth();
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }, {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  private syncWidth(): void {
    // if (!this.overlayRef) {
    //   return;
    // }

    // const refRect = this.reference.getBoundingClientRect();
    // this.overlayRef.updateSize({ width: refRect.width });
  }

}

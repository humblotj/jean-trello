import {
  Component, ChangeDetectionStrategy, Input,
  ViewChild, ViewContainerRef, TemplateRef, ViewEncapsulation, ElementRef, OnInit
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
export class DropdownComponent implements OnInit {
  @Input() reference!: ElementRef;
  @Input() backgroundColor: 'primary' | 'secondary' = 'primary';

  @ViewChild('dropdown') contentTemplate!: TemplateRef<any>;

  private overlayRef: OverlayRef | undefined;

  showing = false;

  constructor(private overlay: Overlay, private viewcontainerRef: ViewContainerRef, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.backgroundColor);
  }

  show(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(new TemplatePortal(this.contentTemplate, this.viewcontainerRef));
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
  }

  hide(): void {
    this.overlayRef?.detach();
    this.showing = false;
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
}

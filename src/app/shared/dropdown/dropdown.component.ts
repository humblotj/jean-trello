import {
  Component, ChangeDetectionStrategy, Input,
  ViewChild, ViewContainerRef, TemplateRef, ViewEncapsulation, ElementRef, OnInit, HostListener
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
  @ViewChild('dropdownRef') dropdownRef: ElementRef | undefined;

  @Input() reference!: ElementRef;
  @Input() backgroundColor: 'primary' | 'secondary' = 'primary';

  @ViewChild('dropdown') contentTemplate!: TemplateRef<any>;

  private overlayRef: OverlayRef | undefined;

  clickoutHandler: ((event: MouseEvent) => void) | null = null;

  showing = false;

  constructor(private overlay: Overlay, private viewcontainerRef: ViewContainerRef, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.backgroundColor);
  }

  show(): void {
    if (!this.showing) {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
      this.overlayRef.attach(new TemplatePortal(this.contentTemplate, this.viewcontainerRef));

      this.clickoutHandler = this.closeDialogFromClickout;
      this.showing = true;
    }
  }

  hide(): void {
    this.overlayRef?.detach();

    this.clickoutHandler = null;
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
      hasBackdrop: false,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  closeDialogFromClickout(event: MouseEvent): void {
    const dialogContainerEl = this.dropdownRef?.nativeElement;
    if (dialogContainerEl) {
      const rect = dialogContainerEl.getBoundingClientRect();
      if (event.clientX <= rect.left || event.clientX >= rect.right ||
        event.clientY <= rect.top || event.clientY >= rect.bottom) {
        this.hide();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent): void {
    if (this.clickoutHandler) {
      this.clickoutHandler(event);
    }
  }
}

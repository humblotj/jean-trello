import {
  Component, ChangeDetectionStrategy, Input,
  ViewChild, ViewContainerRef, TemplateRef, ViewEncapsulation, ElementRef, OnInit, HostListener, OnDestroy
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
export class DropdownComponent implements OnInit, OnDestroy {
  @ViewChild('dropdownRef') dropdownRef: ElementRef | undefined;

  @Input() reference!: ElementRef;
  @Input() backgroundColor: 'primary' | 'secondary' = 'primary';
  @Input() backReference?: DropdownComponent;

  @ViewChild('dropdown') contentTemplate!: TemplateRef<any>;

  private overlayRef!: OverlayRef;

  clickoutHandler: ((event: MouseEvent) => void) | null = null;

  showing = false;

  constructor(private overlay: Overlay, private viewcontainerRef: ViewContainerRef, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.backgroundColor);
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  show(): void {
    if (!this.showing) {
      const overlayRef = this.createOverLay();
      overlayRef.attach(new TemplatePortal(this.contentTemplate, this.viewcontainerRef));

      this.clickoutHandler = this.closeDialogFromClickout;
      this.showing = true;
    }
  }

  hide(): void {
    this.overlayRef?.detach();

    this.clickoutHandler = null;
    this.showing = false;

  }

  back(): void {
    this.hide();
    this.backReference?.show();
  }

  private createOverLay(): OverlayRef {
    if (this.overlayRef) {
      return this.overlayRef;
    }
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.reference)
      .withPush(true)
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

    const overlayConfig = new OverlayConfig({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: false,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    return this.overlayRef;
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

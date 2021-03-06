import {
  Component, ChangeDetectionStrategy, Input,
  ViewChild, ViewContainerRef, TemplateRef, ViewEncapsulation, ElementRef, OnInit, HostListener, OnDestroy
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DropdownService } from './dropdown.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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

  private subscription?: Subscription;

  constructor(private overlay: Overlay, private viewcontainerRef: ViewContainerRef,
    // tslint:disable-next-line: align
    private el: ElementRef, private dropdownService: DropdownService) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.backgroundColor);
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
    this.subscription?.unsubscribe();
  }

  show(): void {
    if (!this.showing) {
      const overlayRef = this.createOverLay();
      overlayRef.attach(new TemplatePortal(this.contentTemplate, this.viewcontainerRef));

      setTimeout(() => this.clickoutHandler = this.closeDialogFromClickout, 0);
      this.showing = true;
      this.subscription = this.dropdownService.closeAllDropdown.pipe(take(1)).subscribe(() => this.showing && this.hide());
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
      }])
      .withDefaultOffsetY(8);

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

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent): void {
    if (this.clickoutHandler) {
      this.clickoutHandler(event);
    }
  }
}

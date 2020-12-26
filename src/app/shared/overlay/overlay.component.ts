import { Component, OnInit, ChangeDetectionStrategy, Type, ElementRef, HostListener, OnDestroy, Input } from '@angular/core';
import { DialogRef } from './dialog-ref';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements OnInit, OnDestroy {
  @Input() type!: 'dialog' | 'card-edit';

  content!: Type<any>;

  private clickoutHandler: ((event: MouseEvent) => void) | null = null;

  constructor(private ref: DialogRef, private el: ElementRef) { }

  close(): void {
    this.ref.close(null);
  }

  ngOnInit(): void {
    this.content = this.ref.content;
    this.el.nativeElement.classList.add('overlay-' + this.type);

    // for scroll inside overlay
    if (this.type === 'dialog') {
      setTimeout(() => {
        this.clickoutHandler = this.closeDialogFromClickout;
      }, 0);
    }
  }


  ngOnDestroy(): void {
    this.clickoutHandler = null;
  }

  closeDialogFromClickout(event: MouseEvent): void {
    const dialogContainerEl = this.el?.nativeElement;
    if (dialogContainerEl) {
      const rect = dialogContainerEl.getBoundingClientRect();
      if (event.clientX <= rect.left || event.clientX >= rect.right ||
        event.clientY <= rect.top || event.clientY >= rect.bottom) {
        this.ref.close();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent): void {
    this.clickoutHandler && this.clickoutHandler(event);
  }
}

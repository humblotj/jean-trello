import {
  Component, OnInit,
  ChangeDetectionStrategy, Input, ElementRef,
  HostListener, ViewChild, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddListComponent implements OnInit {
  @ViewChild('listNameRef') listNameRef: ElementRef | undefined;
  @Input() lists: string[] = [];
  @Output() addList = new EventEmitter<string>();

  isActive = false;
  listName = '';

  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    !this.isActive && (this.isActive = true);
    this.el.nativeElement.classList.remove('is-idle');
    this.listNameRef?.nativeElement.focus();
  }

  constructor(private el: ElementRef) {
    el.nativeElement.classList.add('is-idle');
  }

  ngOnInit(): void {
  }

  onAddList(e: Event): void {
    e.stopPropagation();

    if (this.listName) {
      this.addList.emit(this.listName);
      this.onCancel();
      this.listName = '';
    } else {
      this.listNameRef?.nativeElement.focus();
    }
  }

  onCancel(e?: Event): void {
    e?.stopPropagation();

    this.isActive = false;
    this.el.nativeElement.classList.add('is-idle');
  }

}

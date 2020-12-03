import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('titleRef') titleRef: ElementRef | undefined;
  @Input() cardCreateTitle = '';

  @Output() cardCreateTitleChange = new EventEmitter<string>();
  @Output() cardCreateIndexChange = new EventEmitter<number | null>();
  @Output() addCard = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.titleRef?.nativeElement.focus();
  }

  onAddCard(): void {
    if (this.cardCreateTitle) {
      this.addCard.emit(this.cardCreateTitle);
      this.cardCreateTitleChange.emit('');
    }
    this.titleRef?.nativeElement.focus();
  }

  onCancel(): void {
    this.cardCreateTitleChange.emit('');
    this.cardCreateIndexChange.emit(null);
  }
}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @ViewChild('listNameRef') listNameRef: ElementRef | undefined;
  @Input() index: number | undefined;
  @Input() listName = '';
  @Input() cardCreateTitle = '';
  @Input() cardCreateIndex: number | null = null;

  @Output() cardCreateTitleChange = new EventEmitter<string>();
  @Output() cardCreateIndexChange = new EventEmitter<number | null>();

  cards: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onChangeListName(listName: string): void {
    const trim = listName.trim();
    if (trim) {
      this.listName = listName.trim();
    } else {
      this.listNameRef && (this.listNameRef.nativeElement.value = this.listName);
    }
  }

  blur(event: Event): void {
    (event.target as HTMLTextAreaElement)?.blur();
  }

  onAddCard(title: string): void {
    this.cards = [...this.cards, title];
  }
}

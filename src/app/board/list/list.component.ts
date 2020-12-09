import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DropdownComponent } from 'src/app/shared/dropdown/dropdown.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @ViewChild('listNameRef') listNameRef: ElementRef | undefined;
  @Input() index!: number;
  @Input() listName = '';
  @Input() cardCreatePosition: 'top' | 'bottom' = 'bottom';
  @Input() cardCreateTitle = '';
  @Input() cardCreateIndex: number | null = null;

  @Output() cardCreatePositionChange = new EventEmitter<'top' | 'bottom'>();
  @Output() cardCreateTitleChange = new EventEmitter<string>();
  @Output() cardCreateIndexChange = new EventEmitter<number | null>();

  @Output() archiveList = new EventEmitter<number>();

  cards: string[] = [];
  subscribed = false;

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

  showListActions(listActionsRef: DropdownComponent): void {
    listActionsRef.show();
  }

  onArchiveAllCards(): void {
    this.cards = [];
  }

  onArchiveList(): void {
    this.archiveList.emit(this.index);
  }

  onToggleSubscribed(): void {
    this.subscribed = !this.subscribed;

  }
}

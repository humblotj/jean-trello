import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { DropdownComponent } from 'src/app/shared/dropdown/dropdown.component';
import { AppState } from 'src/app/store/app.reducer';
import { AddCard, ArchiveAllCards, ArchiveList, RenameList, ToggleSubscribeList } from '../store/board.actions';
import { selectCards, selectCardsByList } from '../store/board.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @ViewChild('listNameRef') listNameRef: ElementRef | undefined;
  @Input() index!: number;
  @Input() list?: List;
  @Input() cardCreatePosition: 'top' | 'bottom' = 'bottom';
  @Input() cardCreateTitle = '';
  @Input() cardCreateIndex: number | null = null;

  @Output() cardCreatePositionChange = new EventEmitter<'top' | 'bottom'>();
  @Output() cardCreateTitleChange = new EventEmitter<string>();
  @Output() cardCreateIndexChange = new EventEmitter<number | null>();

  cards$!: Observable<Card[]>;
  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cards$ = this.store.select(selectCardsByList(this.list?.id || ''))
  }

  onChangeListName(listName: string): void {
    const trim = listName.trim();
    if (trim) {
      this.store.dispatch(RenameList({ index: this.index, name: trim }));
    } else {
      this.listNameRef && (this.listNameRef.nativeElement.value = this.list?.name);
    }
  }

  blur(event: Event): void {
    (event.target as HTMLTextAreaElement)?.blur();
  }

  onAddCard(name: string): void {
    this.store.dispatch(AddCard({
      idList: this.list?.id || '', index: 0, name
    }));
  }

  showListActions(listActionsRef: DropdownComponent): void {
    listActionsRef.show();
  }

  onArchiveAllCards(): void {
    this.store.dispatch(ArchiveAllCards({ idList: this.list?.id || '' }));
  }

  onArchiveList(): void {
    this.store.dispatch(ArchiveList({ index: this.index }));
  }

  onToggleSubscribed(): void {
    this.store.dispatch(ToggleSubscribeList({ index: this.index }));
  }

  trackByFn(index: number, item: string): number {
    return index;
  }
}

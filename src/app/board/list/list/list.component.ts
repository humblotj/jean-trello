import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  Component, OnInit, ChangeDetectionStrategy, ViewChild,
  ElementRef, Input, Output, EventEmitter, SimpleChanges, OnChanges
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { DropdownComponent } from 'src/app/shared/dropdown/dropdown.component';
import { DropdownService } from 'src/app/shared/dropdown/dropdown.service';
import { AppState } from 'src/app/store/app.reducer';
import {
  AddCard, ArchiveAllCards, ArchiveList, CopyList, MoveAllCards,
  MoveList, RenameList, MoveCard, SortCards, ToggleSubscribeList
} from '../../store/board.actions';
import { calcPos, selectCardsByList } from '../../store/board.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnChanges {
  @ViewChild('listNameRef') listNameRef: ElementRef | undefined;
  @ViewChild('copyListNameRef') copyListNameRef: ElementRef | undefined;
  @ViewChild('listActionsRef') listActionsRef: DropdownComponent | undefined;
  @Input() extrasMenuRef!: ButtonComponent;
  @Input() index!: number;
  @Input() list?: List;
  @Input() lists?: List[] = [];
  @Input() cardCreatePosition = 0;
  @Input() cardCreateTitle = '';
  @Input() cardCreateIndex: number | null = null;

  @Output() cardCreatePositionChange = new EventEmitter<number>();
  @Output() cardCreateTitleChange = new EventEmitter<string>();
  @Output() cardCreateIndexChange = new EventEmitter<number | null>();

  cards$!: Observable<Card[]>;

  constructor(private store: Store<AppState>, private dropdownService: DropdownService) { }

  ngOnInit(): void {
    this.cards$ = this.store.select(selectCardsByList(this.list?.id || ''));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cardCreatePosition) {
      if (this.index === this.cardCreateIndex) {
        this.cards$.pipe(take(1)).subscribe(cards => {
          if (this.cardCreatePosition > cards.length) {
            setTimeout(() => this.cardCreatePositionChange.next(cards.length), 0);
          }
        });
      }
    }
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

  onAddCard(name: string, cards: Card[] | undefined): void {
    const pos = calcPos(cards || [], this.cardCreatePosition);
    this.store.dispatch(AddCard({ card: new Card(this.list?.id || '', name, pos, false, '') }));
    this.cardCreatePositionChange.emit(this.cardCreatePosition + 1);
  }

  showListActions(): void {
    this.listActionsRef?.show();
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

  onCopyListShow(): void {
    this.copyListNameRef?.nativeElement.focus();
  }

  onCopyList(name: string, dropDown: DropdownComponent): void {
    if (name) {
      this.store.dispatch(CopyList({ name, idList: this.list?.id || '' }));
      dropDown.hide();
    } else {
      this.copyListNameRef?.nativeElement.focus();
    }
  }

  onMoveList(pos: number): void {
    if (pos !== this.index) {
      this.store.dispatch(MoveList({ prevPos: this.index, pos }));
    }
  }

  onSortCards(sortBy: 'newest' | 'oldest' | 'alphabetically'): void {
    this.store.dispatch(SortCards({ idList: this.list?.id || '', sortBy }));
  }

  onMoveAllCards(list: List, ref: DropdownComponent): void {
    if ((list.id !== this.list?.id) && this.list) {
      this.store.dispatch(MoveAllCards({ prevList: this.list, list }));
      ref.hide();
    }
  }

  onStartDrag(): void {
    this.dropdownService.closeAllDropdown.next();
  }

  onDragCard(event: CdkDragDrop<List | undefined>): void {
    const idList = event.container.data?.id || '';
    const card = event.item.data;
    const position = event.currentIndex;
    this.store.dispatch(MoveCard({ card, idList, position }));
  }

  trackByFn(index: number, item: Card): string {
    return item.id;
  }
}

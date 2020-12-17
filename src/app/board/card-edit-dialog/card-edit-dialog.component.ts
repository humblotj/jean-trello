import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { DialogRef } from 'src/app/shared/overlay/dialog-ref';
import { AppState } from 'src/app/store/app.reducer';
import { EditCard, DeleteCard, MoveCard } from '../store/board.actions';
import { findCard, findList, selectCardsByList, selectLists } from '../store/board.reducer';

@Component({
  selector: 'app-card-edit-dialog',
  templateUrl: './card-edit-dialog.component.html',
  styleUrls: ['./card-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditDialogComponent implements OnInit {
  @ViewChild('cardTitleRef') cardTitleRef: ElementRef | undefined;
  @ViewChild('descRef') descRef: ElementRef | undefined;
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  card$!: Observable<Card | undefined>; // card active
  list$!: Observable<List | undefined>; // list active
  cards$!: Observable<Card[] | undefined>; // for list of position
  lists$!: Observable<List[] | undefined>; // for list of list

  // for description
  isEditingDesc = false;

  // for moving card
  currentPosition = 0;
  movePosition: string | number = 0;

  constructor(private dialogRef: DialogRef, private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.currentPosition = dialogRef?.data.index;
    this.movePosition = this.currentPosition;
  }

  ngOnInit(): void {
    this.card$ = this.store.select(findCard(this.dialogRef?.data?.card?.id));
    this.cards$ = this.store.select(selectCardsByList(this.dialogRef?.data?.card?.idList));
    this.list$ = this.store.select(findList(this.dialogRef?.data?.card?.idList));
    this.lists$ = this.store.select(selectLists);
  }

  onChangeCardTitle(listName: string, card: Card | undefined): void {
    const trim = listName.trim();
    if (trim && card) {
      this.store.dispatch(EditCard({ card: { ...card, name: trim } }));
    } else {
      this.cardTitleRef && (this.cardTitleRef.nativeElement.value = card?.name || '');
    }
  }

  blur(event: Event): void {
    (event.target as HTMLTextAreaElement)?.blur();
  }

  close(): void {
    this.dialogRef.close();
  }

  onToggleWatch(card: Card | undefined): void {
    if (card) {
      this.store.dispatch(EditCard({ card: { ...card, subscribed: !card?.subscribed } }));
    }
  }

  onArchiveCard(card: Card | undefined): void {
    if (card) {
      this.store.dispatch(EditCard({ card: { ...card, closed: true } }));
    }
  }

  onRestoreCard(card: Card | undefined): void {
    if (card) {
      this.store.dispatch(EditCard({ card: { ...card, closed: false } }));
    }
  }

  onDeleteCard(card: Card | undefined): void {
    if (card) {
      this.store.dispatch(DeleteCard({ card }));
      this.close();
    }
  }

  onOpenEdit(): void {
    this.isEditingDesc = true;
    setTimeout(() => this.descRef?.nativeElement.focus(), 0);
  }

  onEditDescription(desc: string, card: Card | undefined): void {
    if (card) {
      this.store.dispatch(EditCard({ card: { ...card, desc } }));
      this.isEditingDesc = false;
    }
  }

  fetchPosition(idList: string): void {
    this.cards$ = this.store.select(selectCardsByList(idList)).pipe(
      tap(cards => {
        if (idList !== this.dialogRef?.data.card.idList) {
          this.movePosition = cards.length;
        } else {
          this.movePosition = cards.findIndex(c => c.id === this.dialogRef?.data?.card?.id);
        }
        this.cdr.detectChanges();
      }));
  }

  onMoveCard(card: Card | undefined, idList: string): void {
    if (card) {
      this.store.dispatch(MoveCard({ card, idList, position: +this.movePosition }));
      this.list$ = this.store.select(findList(idList));
    }
  }

  getPositionList(cards: Card[] | null | undefined, card: Card | undefined, idList: string): [] {
    return [].constructor(((cards?.length || 0) + (card?.idList === idList ? 0 : 1)));
  }
}

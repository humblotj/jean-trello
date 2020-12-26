import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { DropdownComponent } from 'src/app/shared/dropdown/dropdown.component';
import { DialogRef } from 'src/app/shared/overlay/dialog-ref';
import { AppState } from 'src/app/store/app.reducer';
import { CopyCard, EditCard, MoveCard } from '../../store/board.actions';
import { findList, selectCardsByList, selectLists } from '../../store/board.reducer';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditComponent implements OnInit, AfterViewInit {
  @ViewChild('buttons') buttons!: ElementRef;
  @ViewChild('cardNameRef') cardNameRef!: ElementRef;
  @ViewChild('copyCardNameRef') copyCardNameRef: ElementRef | undefined;

  card!: Card; // card active
  list$!: Observable<List | undefined>; // list active
  cards$!: Observable<Card[] | undefined>; // for list of position
  lists$!: Observable<List[] | undefined>; // for list of list

  // for moving card
  idListSelected?: string;
  currentPosition = 0;
  movePosition: string | number = 0;

  constructor(private dialogRef: DialogRef, private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.card = dialogRef?.data.card;
    this.currentPosition = dialogRef?.data.index;
    this.movePosition = this.currentPosition;
    this.idListSelected = dialogRef?.data.card.idList;
  }

  ngOnInit(): void {
    this.cards$ = this.store.select(selectCardsByList(this.dialogRef?.data?.card?.idList));
    this.list$ = this.store.select(findList(this.dialogRef?.data?.card?.idList));
    this.lists$ = this.store.select(selectLists);
  }

  ngAfterViewInit(): void {
    this.buttons.nativeElement.classList.add('fade-in');
  }

  onSave(): void {
    const trim = this.cardNameRef.nativeElement.value.trim();
    if (trim) {
      this.store.dispatch(EditCard({ card: { ...this.card, name: trim } }));
      this.dialogRef.close();
    } else {
      this.cardNameRef.nativeElement.focus();
    }
  }

  onArchive(): void {
    this.store.dispatch(EditCard({ card: { ...this.card, closed: true } }));
    this.dialogRef.close();
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

  onMoveCard(): void {
    const idList = this.idListSelected || '';
    this.store.dispatch(MoveCard({ card: this.card, idList, position: +this.movePosition }));
    this.dialogRef.close();
  }

  onOpenCopyCard(dropdown: DropdownComponent): void {
    this.fetchPosition(this.dialogRef.data?.card.idList);
    dropdown.show();
    this.copyCardNameRef?.nativeElement.focus();
  }

  onCopyCard(dropdown: DropdownComponent, event: Event): void {
    event.stopPropagation();

    const name = this.copyCardNameRef?.nativeElement.value;
    if (!name) {
      this.copyCardNameRef?.nativeElement.focus();
    } else {
      const idList = this.idListSelected || '';
      this.store.dispatch(CopyCard({ card: this.card, name, idList, position: +this.movePosition }));
      dropdown.hide();
      this.dialogRef.close();
    }
  }

  getPositionList(cards: Card[] | null | undefined, isCopy?: boolean): [] {
    return [].constructor(((cards?.length || 0) + (isCopy || (this.card.idList !== this.idListSelected) ? 1 : 0)));
  }
}

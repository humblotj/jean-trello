import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { DropdownComponent } from 'src/app/shared/dropdown/dropdown.component';
import { DialogRef } from 'src/app/shared/overlay/dialog-ref';
import { AppState } from 'src/app/store/app.reducer';
import { EditCard, DeleteCard, MoveCard, CopyCard } from '../../store/board.actions';
import { findCard, findList, selectCardsByList, selectLists } from '../../store/board.reducer';

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
  @ViewChild('copyCardNameRef') copyCardNameRef: ElementRef | undefined;

  card$!: Observable<Card | undefined>; // card active
  list$!: Observable<List | undefined>; // list active
  cards$!: Observable<Card[] | undefined>; // for list of position
  lists$!: Observable<List[] | undefined>; // for list of list

  // for description
  clickoutHandler: ((event: MouseEvent) => void) | null = null;

  // for moving card
  idListSelected?: string;
  currentPosition = 0;
  movePosition: string | number = 0;

  constructor(private dialogRef: DialogRef, private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.currentPosition = dialogRef?.data.index;
    this.movePosition = this.currentPosition;
    this.idListSelected = dialogRef?.data.card.idList;
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

  onOpenEdit(event?: MouseEvent): void {
    event?.stopPropagation();
    this.clickoutHandler = this.closeDialogFromClickout;
    setTimeout(() => this.descRef?.nativeElement.focus(), 0);
  }

  onEditDescription(desc: string, card: Card | undefined): void {
    if (card) {
      this.store.dispatch(EditCard({ card: { ...card, desc } }));
      this.clickoutHandler = null;
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

  onMoveCard(card: Card | undefined): void {
    const idList = this.idListSelected || '';
    if (card) {
      this.store.dispatch(MoveCard({ card, idList, position: +this.movePosition }));
      this.list$ = this.store.select(findList(idList));
    }
  }

  onOpenCopyCard(dropdown: DropdownComponent): void {
    this.fetchPosition(this.dialogRef.data?.card.idList);
    dropdown.show();
    this.copyCardNameRef?.nativeElement.focus();
  }

  onCopyCard(card: Card | undefined, dropdown: DropdownComponent, event: Event): void {
    event.stopPropagation();

    const name = this.copyCardNameRef?.nativeElement.value;
    if (!name) {
      this.copyCardNameRef?.nativeElement.focus();
    } else {
      const idList = this.idListSelected || '';
      console.log(idList);
      if (card) {
        this.store.dispatch(CopyCard({ card, name, idList, position: +this.movePosition }));
        this.list$ = this.store.select(findList(idList));
        dropdown.hide();
      }
    }
  }

  getPositionList(cards: Card[] | null | undefined, card: Card | undefined, isCopy?: boolean): [] {
    return [].constructor(((cards?.length || 0) + (isCopy || (card?.idList !== this.idListSelected) ? 1 : 0)));
  }


  closeDialogFromClickout(event: MouseEvent): void {
    const dialogContainerEl = this.descRef?.nativeElement;
    if (dialogContainerEl) {
      console.log("close")
      const rect = dialogContainerEl.getBoundingClientRect();
      if (event.clientX <= rect.left || event.clientX >= rect.right ||
        event.clientY <= rect.top || event.clientY >= rect.bottom) {
        this.card$.pipe(take(1)).subscribe(card => {
          this.onEditDescription(dialogContainerEl.value, card);
        });
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent): void {
    if (this.clickoutHandler) {
      this.clickoutHandler(event);
    }
  }

}

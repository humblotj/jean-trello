import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { DialogRef } from 'src/app/shared/overlay/dialog-ref';
import { AppState } from 'src/app/store/app.reducer';
import { EditCard } from '../store/board.actions';
import { findCard, findList } from '../store/board.reducer';

@Component({
  selector: 'app-card-edit-dialog',
  templateUrl: './card-edit-dialog.component.html',
  styleUrls: ['./card-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditDialogComponent implements OnInit {
  @ViewChild('cardTitleRef') cardTitleRef: ElementRef | undefined;

  card$: Observable<Card | undefined>;
  list$!: Observable<List | undefined>;

  constructor(private dialogRef: DialogRef, private store: Store<AppState>) {
    this.card$ = this.store.select(findCard(dialogRef?.data?.card?.id));
    this.list$ = this.store.select(findList(dialogRef?.data?.card?.idList));
  }

  ngOnInit(): void {
  }

  onChangeCardTitle(listName: string, card: Card | undefined): void {
    const trim = listName.trim();
    if (trim && card) {
      this.store.dispatch(EditCard({ card: { ...card, name: listName.trim() } }));
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

  toggleWatch(card: Card | undefined): void {
    if (card) {
      this.store.dispatch(EditCard({ card: { ...card, subscribed: !card?.subscribed } }));
    }
  }
}

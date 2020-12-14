import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { Card } from 'src/app/model/card.model';
import { DialogRef } from 'src/app/shared/overlay/dialog-ref';
import { AppState } from 'src/app/store/app.reducer';
import { EditCard } from '../store/board.actions';

@Component({
  selector: 'app-card-edit-dialog',
  templateUrl: './card-edit-dialog.component.html',
  styleUrls: ['./card-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditDialogComponent implements OnInit {
  @ViewChild('cardTitleRef') cardTitleRef: ElementRef | undefined;

  card?: Card;
  subscribed = false;

  constructor(private dialogRef: DialogRef, private store: Store<AppState>) {
    this.card = dialogRef?.data?.card;
  }

  ngOnInit(): void {
  }

  onChangeCardTitle(listName: string): void {
    const trim = listName.trim();
    if (trim && this.card) {
      this.store.dispatch(EditCard({ card: { ...this.card, name: listName.trim() } }));
    } else {
      this.cardTitleRef && (this.cardTitleRef.nativeElement.value = this.card?.name || '');
    }
  }

  blur(event: Event): void {
    (event.target as HTMLTextAreaElement)?.blur();
  }

  close(): void {
    this.dialogRef.close();
  }

  toggleWatch(): void {
    this.subscribed = !this.subscribed;
  }
}

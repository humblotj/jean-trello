import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Card } from 'src/app/model/card.model';
import { DialogRef } from 'src/app/shared/overlay/dialog-ref';
import { AppState } from 'src/app/store/app.reducer';
import { EditCard } from '../../store/board.actions';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditComponent implements OnInit, AfterViewInit {
  @ViewChild('buttons') buttons!: ElementRef;
  @ViewChild('cardNameRef') cardNameRef!: ElementRef;

  card!: Card; // card active

  constructor(private dialogRef: DialogRef, private store: Store<AppState>) {
    this.card = dialogRef?.data.card;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buttons.nativeElement.classList.add('fade-in');
  }

  save(): void {
    const trim = this.cardNameRef.nativeElement.value.trim();
    if (trim) {
      this.store.dispatch(EditCard({ card: { ...this.card, name: trim } }));
      this.dialogRef.close();
    } else {
      this.cardNameRef.nativeElement.focus();
    }
  }


}

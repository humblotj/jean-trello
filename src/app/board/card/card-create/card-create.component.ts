import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, ElementRef, Input, AfterViewInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { AppState } from 'src/app/store/app.reducer';
import { posIncr, selectCardsByList, selectLists } from '../../store/board.reducer';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('titleRef') titleRef: ElementRef | undefined;
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;
  @Input() cardCreateTitle = '';
  @Input() cardCreatePosition = 0;
  @Input() cardCreateIndex = 0;

  @Output() cardCreatePositionChange = new EventEmitter<number>();
  @Output() cardCreateTitleChange = new EventEmitter<string>();
  @Output() cardCreateIndexChange = new EventEmitter<number | null>();
  @Output() addCard = new EventEmitter<string>();

  lists$!: Observable<List[]>;
  cards$?: Observable<Card[]>;

  constructor(private store: Store<AppState>, private el: ElementRef, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.lists$ = this.store.select(selectLists);
  }

  ngAfterViewInit(): void {
    this.titleRef?.nativeElement.focus();
  }

  onAddCard(): void {
    if (this.cardCreateTitle) {
      this.addCard.emit(this.cardCreateTitle);
      this.cardCreateTitleChange.emit('');
    }
    this.titleRef?.nativeElement.focus();
    this.triggerResize();
    setTimeout(() =>
      this.el?.nativeElement.scrollIntoView(), 0);
  }

  onCancel(): void {
    this.cardCreateTitleChange.emit('');
    this.cardCreateIndexChange.emit(null);
  }

  triggerResize(): void {
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize?.resizeToFitContent(true));
  }

  onOpenPosition(lists: List[] | undefined | null): void {
    if (lists) {
      this.cards$ = this.store.select(selectCardsByList(lists[this.cardCreateIndex]?.id || ''));
    }
  }

  onSelectList(index: number, cards: Card[] | null): void {
    if (cards) {
      if (this.cardCreatePosition === cards.length) {
        this.cardCreateIndexChange.next(+index);
        this.cardCreatePositionChange.next(posIncr);
      } else {
        this.cardCreateIndexChange.next(+index);
      }
    }
  }

  onSelectPosition(position: number): void {
    this.cardCreatePositionChange.next(+position);
  }
}

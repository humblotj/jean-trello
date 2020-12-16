import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { List } from '../model/list.model';
import { AppState } from '../store/app.reducer';
import { selectLists } from './store/board.reducer';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  lists$!: Observable<List[]>;

  cardCreatePosition = 0;
  cardCreateTitle = '';
  cardCreateIndex: number | null = null;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.lists$ = this.store.select(selectLists);
  }

  trackByFn(index: number, item: List): string {
    return item.id;
  }
}

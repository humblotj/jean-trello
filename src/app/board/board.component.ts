import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { List } from '../model/list.model';
import { DialogService } from '../shared/overlay/dialog.service';
import { AppState } from '../store/app.reducer';
import { CardEditDialogComponent } from './card-edit-dialog/card-edit-dialog.component';
import { selectLists } from './store/board.reducer';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  lists$: Observable<List[]>;

  cardCreatePosition: 'top' | 'bottom' = 'bottom';
  cardCreateTitle = '';
  cardCreateIndex: number | null = null;

  constructor(store: Store<AppState>, private d: DialogService) {
    this.lists$ = store.select(selectLists);
  }

  ngOnInit(): void {
    // this.d.open(CardEditDialogComponent);
  }

  trackByFn(index: number, item: List): number {
    return index;
  }
}

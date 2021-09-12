import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { List } from '../model/list.model';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { DropdownService } from '../shared/dropdown/dropdown.service';
import { AppState } from '../store/app.reducer';
import { LoadBoard, MoveList, RenameList } from './store/board.actions';
import { selectIdBoard, selectLists } from './store/board.reducer';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  boardId$!: Observable<string>;
  lists$!: Observable<List[]>;

  cardCreatePosition = 0;
  cardCreateTitle = '';
  cardCreateIndex: number | null = null;

  constructor(private store: Store<AppState>, private dropdownService: DropdownService) {
    let boardName = localStorage.getItem('boardName');
    if (!boardName) {
      boardName = prompt('Enter the name of your board') || UUID.UUID();
      localStorage.setItem('boardName', boardName);
    }
    this.store.dispatch(LoadBoard({ name: boardName }));
  }

  ngOnInit(): void {
    this.boardId$ = this.store.select(selectIdBoard);
    this.lists$ = this.store.select(selectLists);
  }

  onStartDrag(): void {
    this.dropdownService.closeAllDropdown.next();
  }

  onDragList(event: CdkDragDrop<List[]>, lists: List[]): void {
    this.store.dispatch(MoveList({ list: lists[event.previousIndex], newIndex: event.currentIndex }));
  }

  showListActions(listActionsRef: DropdownComponent): void {
    listActionsRef.show();
  }

  onChangeListName(listNameRef: HTMLTextAreaElement, list: List, index: number): void {
    const trim = listNameRef.value.trim();
    if (trim) {
      this.store.dispatch(RenameList({ name: trim, list }));
    } else {
      listNameRef.value = list.name;
    }
  }

  blur(event: Event): void {
    (event.target as HTMLTextAreaElement)?.blur();
  }

  trackByFn(index: number, item: List): string {
    return item._id;
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { combineLatest, EMPTY } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';

import { AppState } from 'src/app/store/app.reducer';
import { BoardService } from '../services/board.service';
import { CardCreated, CardUpdated, ListCreated, ListUpdated } from './board.actions';
import { calcPos, posIncr, selectBoard, selectCards, selectIdBoard, selectLists } from './board.reducer';

@Injectable()
export class BoardEffects {
  loadBoard$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Load Board'),
    switchMap(({ name }) => this.boardService.loadBoard(name)
      .pipe(
        map(({ id, lists, cards }) => ({ type: '[Board] Board Loaded', id, lists, cards })),
        catchError(() => EMPTY)
      ))
  ));

  createList$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Create List'),
    withLatestFrom(combineLatest([this.store.select(selectIdBoard), this.store.select(selectLists)])),

    switchMap(([{ name }, [idBoard, lists]]) => {
      const tempId = UUID.UUID();
      const prevPos = lists[lists.length - 1]?.pos || 0;
      this.store.dispatch(ListCreated({ list: new List(name, prevPos + posIncr + Math.floor(prevPos / posIncr), false, tempId) }));

      return this.boardService.createList({
        idBoard,
        name,
        pos: prevPos + posIncr + Math.floor(prevPos / posIncr),
        subscribed: false
      })
        .pipe(
          map((list) => ({ type: '[Board] List Updated', list: { ...list, tempId } })),
          catchError(() => EMPTY)
        );
    }
    )
  ));

  archiveList$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Archive List'),
    switchMap(({ id }) => this.boardService.deleteList(id)
      .pipe(
        map(() => ({ type: '[Board] List Archived', id })),
        catchError(() => EMPTY)
      )
    )
  ));

  renameList$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Rename List'),
    switchMap(({ name, list: { _id, idBoard, pos, subscribed } }) => {
      this.store.dispatch(ListUpdated({ list: new List(name, pos, subscribed, _id) }));

      return this.boardService.updateList({ _id, idBoard, name, pos, subscribed })
        .pipe(
          map((list) => ({ type: '[Board] List Updated', list })),
          catchError(() => EMPTY)
        );
    }
    )
  ));

  toggleSubscribedList$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Toggle Subscribed List'),
    switchMap(({ list: { _id, idBoard, name, pos, subscribed } }) => {
      this.store.dispatch(ListUpdated({ list: new List(name, pos, !subscribed, _id) }));

      return this.boardService.updateList({ _id, idBoard, name, pos, subscribed: !subscribed })
        .pipe(
          map((list) => ({ type: '[Board] List Updated', list })),
          catchError(() => EMPTY)
        );
    }
    )
  ));

  moveList$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Move List'),
    withLatestFrom(this.store.select(selectLists)),
    switchMap(([{ newIndex, list: { _id, idBoard, name, subscribed } }, lists]) => {
      const pos = calcPos(lists.filter(l => l._id !== _id), newIndex);
      this.store.dispatch(ListUpdated({ list: new List(name, pos, subscribed, _id) }));

      return this.boardService.updateList({
        _id, idBoard, name,
        pos,
        subscribed,
      })
        .pipe(
          map((list) => ({ type: '[Board] List Updated', list })),
          catchError(() => EMPTY)
        );
    }
    )
  ));

  copyList$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Copy List'),
    withLatestFrom(combineLatest([this.store.select(selectIdBoard), this.store.select(selectLists)])),
    switchMap(([{ name, list: { _id } }, [idBoard, lists]]) => {
      const index = lists.findIndex(l => l._id === _id) + 1;
      const pos = calcPos(lists, index);
      const tempId = UUID.UUID();
      this.store.dispatch(ListCreated({ list: new List(name, pos, false, tempId) }));

      return this.boardService.createList({
        idBoard,
        name,
        pos,
        subscribed: false
      })
        .pipe(
          map((list) => ({ type: '[Board] List Updated', list: { ...list, tempId } })),
          catchError(() => EMPTY)
        );
    }
    )
  ));

  createCard$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Create Card'),
    withLatestFrom(this.store.select(selectIdBoard)),
    switchMap(([{ name, idList, pos }, idBoard]) => {
      const tempId = UUID.UUID();
      this.store.dispatch(CardCreated({ card: new Card(idList, name, pos, false, '', tempId) }));

      return this.boardService.createCard(
        { name, idBoard, idList, pos, subscribed: false, desc: '', closed: false })
        .pipe(
          map((card) => ({ type: '[Board] Card Updated', card: { ...card, tempId } })),
          catchError(() => EMPTY)
        );
    }
    )
  ));

  deleteCard$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Delete Card'),
    switchMap(({ id }) => this.boardService.deleteCard(id)
      .pipe(
        map(() => ({ type: '[Board] Card Deleted', id })),
        catchError(() => EMPTY)
      )
    )
  ));

  updateCard$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Update Card'),
    switchMap(({ card }) => this.boardService.updateCard(card)
      .pipe(
        map((card) => ({ type: '[Board] Card Updated', card })),
        catchError(() => EMPTY)
      )
    )
  ));

  copyCard$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Copy Card'),
    withLatestFrom(combineLatest([this.store.select(selectIdBoard), this.store.select(selectCards)])),
    switchMap(([{ card: { subscribed, desc, closed }, name, idList, index }, [idBoard, cards]]) => {
      const listCards = cards.filter(c => c.idList === idList);
      const pos = calcPos(listCards, index);
      const tempId = UUID.UUID();
      this.store.dispatch(CardCreated({ card: new Card(idList, name, pos, subscribed, desc, tempId) }));

      return this.boardService.createCard(
        { name, idBoard, idList, pos, subscribed, desc, closed })
        .pipe(
          map((card) => ({ type: '[Board] Card Updated', card: { ...card, tempId } })),
          catchError(() => EMPTY)
        );
    })
  ));

  moveCard$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Move Card'),
    withLatestFrom(combineLatest([this.store.select(selectIdBoard), this.store.select(selectCards)])),
    switchMap(([{ card: { _id, name, subscribed, desc, closed }, idList, index }, [idBoard, cards]]) => {
      const listCards = cards.filter(c => c.idList === idList && c._id !== _id);
      const pos = calcPos(listCards, index);
      this.store.dispatch(CardUpdated({ card: new Card(idList, name, pos, subscribed, desc, _id) }));

      return this.boardService.updateCard(
        { _id, name, idBoard, idList, pos, subscribed, desc, closed })
        .pipe(
          map((card) => ({ type: '[Board] Card Updated', card })),
          catchError(() => EMPTY)
        );
    })
  ));

  archiveAllCards$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Archive All Cards'),
    switchMap(({ idList }) => this.boardService.archiveAllCards(idList)
      .pipe(
        map(() => ({ type: '[Board] All Cards Archived' })),
        catchError(() => EMPTY)
      )
    )
  ));

  moveAllCards$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Move All Cards'),
    switchMap(({ prev, next }) => this.boardService.moveAllCards({ prev, next })
      .pipe(
        map(() => ({ type: '[Board] All Cards Moved' })),
        catchError(() => EMPTY)
      )
    )
  ));

  sortCards$ = createEffect(() => this.actions$.pipe(
    ofType('[Board] Sort Cards'),
    switchMap(({ idList, sortBy }) => this.boardService.sortCards({ idList, sortBy })
      .pipe(
        map(() => ({ type: '[Board] Cards Sorted' })),
        catchError(() => EMPTY)
      )
    )
  ));


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private boardService: BoardService
  ) { }
}

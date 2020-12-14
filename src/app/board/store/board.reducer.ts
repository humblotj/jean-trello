import { createReducer, createSelector, on } from '@ngrx/store';
import { Props } from '@ngrx/store/src/models';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { AppState } from 'src/app/store/app.reducer';
import * as BoardActions from './board.actions';

export interface State {
  lists: List[];
  cards: Card[];
}

const posIncr = 65535;

const initialState: State = {
  lists: [new List('To Do', posIncr, false, '1'), new List('Doing', posIncr * 2, false, '2'), new List('Done', posIncr * 3, false, '3')],
  cards: [new Card('1', 'test', 0, false, '')]
};

export const selectBoard = (state: AppState) => state.board;

export const selectLists = createSelector(
  selectBoard,
  (state: State) => state.lists
);

export const selectCards = createSelector(
  selectBoard,
  (state: State) => state.cards
);

export const selectCardsByList = (idList: string) => createSelector(
  selectCards,
  (cards) => cards.filter(card => idList && card.idList === idList)
);

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.SetLists,
    (state, { lists }) => ({ ...state, lists })),
  on(BoardActions.AddList,
    (state, { list }) => ({ ...state, lists: [...state.lists, list] })),
  on(BoardActions.ArchiveList,
    (state, { index }) => ({ ...state, lists: [...state.lists.slice(0, index), ...state.lists.slice(index + 1)] })),
  on(BoardActions.RenameList,
    (state, { index, name }) => ({
      ...state,
      lists: [...state.lists.slice(0, index), { ...state.lists[index], name }, ...state.lists.slice(index + 1)]
    })),
  on(BoardActions.ToggleSubscribeList,
    (state, { index }) => ({
      ...state,
      lists: [...state.lists.slice(0, index),
      { ...state.lists[index], subscribed: !state.lists[index].subscribed }, ...state.lists.slice(index + 1)]
    })),
  on(BoardActions.AddCard,
    (state, { idList, index, name }) => ({
      ...state,
      cards: [...state.cards, new Card(idList, name, state.cards[state.cards.length - 1].pos + posIncr, false, '')]
    })),
  on(BoardActions.ArchiveAllCards,
    (state, { idList }) => ({
      ...state,
      cards: state.cards.filter(
        card => card.idList !== idList)
    })),
  on(BoardActions.EditCard,
    (state, { card }) => {
      const index = state.cards.findIndex(c => c.id === card.id);
      if (index < 0) {
        return { ...state };
      }
      return {
        ...state,
        cards: [...state.cards.slice(0, index), card, ...state.cards.slice(index + 1)]
      };
    })
);

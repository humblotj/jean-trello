import { createReducer, createSelector, on } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { AppState } from 'src/app/store/app.reducer';
import * as BoardActions from './board.actions';

export interface State {
  lists: List[];
  cards: Card[];
}

export const posIncr = 65535;

const initialState: State = {
  lists: [new List('To Do', posIncr, false, '1'), new List('Doing', posIncr * 2, false, '2'), new List('Done', posIncr * 3, false, '3')],
  cards: [new Card('1', 'test', posIncr, false, '')]
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
  (cards) => cards.filter(card => idList && card.idList === idList && !card.closed)
);

export const findList = (idList: string) => createSelector(
  selectLists,
  (lists) => lists.find(list => list.id === idList)
);

export const findCard = (id: string) => createSelector(
  selectCards,
  (cards) => cards.find(card => card.id === id)
);

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.SetLists,
    (state, { lists }) => ({ ...state, lists })),
  on(BoardActions.AddList,
    (state, { name }) => {
      const prevPos = state.lists[state.lists.length - 1]?.pos || 0;
      return {
        ...state, lists: [...state.lists,
        new List(name, prevPos + posIncr + Math.floor(prevPos / posIncr), false)]
      };
    }),
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
    (state, { card }) => {
      let index = 0;
      let listFound = false;
      for (const c of state.cards) {
        if (c.idList === card.idList) {
          listFound = true;
          if (c.pos > card.pos) {
            break;
          }
        } else {
          if (listFound) {
            break;
          }
        }
        index++;
      }
      const cards = index > 0 ?
        [...state.cards.slice(0, index), card, ...state.cards.slice(index)]
        : [card, ...state.cards.slice(index)];
      return {
        ...state, cards
      };
    }),
  on(BoardActions.ArchiveAllCards,
    (state, { idList }) => ({
      ...state,
      cards: state.cards.map(
        card => {
          if (card.idList === idList) {
            return { ...card, closed: true };
          } else {
            return card;
          }
        })
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
    }),
  on(BoardActions.DeleteCard,
    (state, { card }) => {
      const index = state.cards.findIndex(c => c.id === card.id);
      if (index < 0) {
        return { ...state };
      }
      return {
        ...state,
        cards: [...state.cards.slice(0, index), ...state.cards.slice(index + 1)]
      };
    }),
  on(BoardActions.CopyList,
    (state, { name, idList }) => {
      const index = state.lists.findIndex(l => l.id === idList) + 1;
      if (index < 0) {
        return { ...state };
      }
      const pos = calcPos(state.lists, index);
      const uuid = UUID.UUID();
      const copyCards = state.cards.filter(card => card.idList === idList).map(card => ({ ...card, idList: uuid }));
      return {
        ...state,
        lists: [...state.lists.slice(0, index), new List(name, pos, false, uuid), ...state.lists.slice(index)],
        cards: [...state.cards, ...copyCards]
      };
    }),
  on(BoardActions.MoveList,
    (state, { prevPos, pos }) => {
      return {
        ...state,
        lists: move(state.lists, prevPos, pos)
      };
    }),
  on(BoardActions.SortCards,
    (state, { idList, sortBy }) => {
      let cards: Card[] = [];
      const newArray = state.cards.filter(c => {
        if (c.idList === idList) {
          cards.push(c);
          return false;
        } else {
          return true;
        }
      });
      cards.sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return a.createAt < b.createAt ? 1 : -1;
          case 'oldest':
            return a.createAt > b.createAt ? 1 : -1;
          case 'alphabetically':
            return a.name > b.name ? 1 : -1;
          default:
            return 1;
        }
      });
      let i = 0;
      cards = cards.map(c => { i++; return { ...c, pos: posIncr * i + (i - 1) }; });
      return {
        ...state,
        cards: [...newArray, ...cards]
      };
    })
);

export const calcPos = (array: Card[] | List[], index: number) => {
  let pos = posIncr;
  if (!array.length) {
    return pos;
  }
  else if (index === array.length) {
    const prevPos = array[array.length - 1].pos;
    pos = prevPos + posIncr + 1;
  }
  else if (index === 0) {
    const nextPos = array[index].pos;
    pos = nextPos / 2;
  }
  else {
    const prevPos = array[index - 1].pos;
    const nextPos = array[index].pos;
    pos = (prevPos + nextPos) / 2;
  }
  return pos;
};

const move = (arr: any[], from: number, to: number) => {
  const pos = calcPos([...arr.slice(0, from), ...arr.slice(from + 1)], to);
  const item = { ...arr[from], pos };
  const clone = [...arr.slice(0, from), item, ...arr.slice(from + 1)];
  Array.prototype.splice.call(clone, to, 0,
    Array.prototype.splice.call(clone, from, 1)[0]
  );
  return clone;
};

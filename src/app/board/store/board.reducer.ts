import { createReducer, createSelector, on } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';
import { AppState } from 'src/app/store/app.reducer';
import * as BoardActions from './board.actions';

export interface State {
  idBoard: string;
  lists: List[];
  cards: Card[];
}

export const posIncr = 65535;

const initialState: State = {
  idBoard: '',
  lists: [],
  cards: [],
};

export const selectBoard = (state: AppState) => state.board;

export const selectIdBoard = (state: AppState) => state.board.idBoard;

export const selectLists = createSelector(
  (state: AppState) => state.board.lists,
  (lists: List[]) => lists.slice().sort((a, b) => a.pos < b.pos ? -1 : 1)
);

export const selectCards = createSelector(
  (state: AppState) => state.board.cards,
  (cards: Card[]) => cards.slice().sort((a, b) => {
    if (a.idList < b.idList) {
      return -1;
    } else if (a.idList > b.idList) {
      return 1;
    } else {
      return a.pos < b.pos ? -1 : 1;
    }
  })
);

export const selectCardsByList = (idList: string) => createSelector(
  selectCards,
  (cards) => cards?.filter(card => idList && card.idList === idList)
);

export const findList = (idList: string) => createSelector(
  selectLists,
  (lists) => lists.find(list => list._id === idList)
);

export const findCard = (id: string) => createSelector(
  selectCards,
  (cards) => cards.find(card => card._id === id)
);

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.BoardLoaded,
    (state, { id, lists, cards }) => ({ ...state, idBoard: id, lists, cards })),
  on(BoardActions.ListCreated,
    (state, { list }) => ({ ...state, lists: [...state.lists, list] })),
  on(BoardActions.ArchiveList,
    (state, { id }) => ({ ...state, lists: state.lists.filter((list) => list._id != id) })),
  on(BoardActions.ListUpdated,
    (state, { list }) => ({ ...state, lists: state.lists.map((l) => l._id === list._id || (l.tempId && l.tempId === list.tempId) ? list : l) })),
  on(BoardActions.CardCreated,
    (state, { card }) => ({ ...state, cards: [...state.cards, card] })),
  on(BoardActions.DeleteCard,
    (state, { id }) => ({ ...state, cards: state.cards.filter((c) => c._id != id) })),
  on(BoardActions.CardUpdated,
    (state, { card }) => ({ ...state, cards: state.cards.map((c) => c._id === card._id || (c.tempId && c.tempId === card.tempId) ? card : c) })),
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
            return a.create_at < b.create_at ? 1 : -1;
          case 'oldest':
            return a.create_at > b.create_at ? 1 : -1;
          case 'alphabetically':
            return a.name > b.name ? 1 : -1;
          default:
            return 1;
        }
      });
      console.log(cards, newArray, sortBy);
      cards = cards.map((c, i) => ({ ...c, pos: posIncr * i + (i - 1) }));
      return {
        ...state,
        cards: [...newArray, ...cards]
      };
    }),
  on(BoardActions.MoveAllCards,
    (state, { prev, next }) => {
      let prevCardsList: Card[] = [];
      const currentCardsList: Card[] = [];
      const cards = state.cards.filter(c => {
        if (c.idList === prev) {
          prevCardsList.push(c);
          return false;
        } else if (c.idList === next) {
          currentCardsList.push(c);
          return false;
        } else {
          return true;
        }
      });

      if (!prevCardsList.length) {
        return { ...state };
      }

      const lastPos = currentCardsList.length ? currentCardsList[currentCardsList.length - 1].pos : 0;
      let i = 0;
      prevCardsList = prevCardsList.map(c => { i++; return { ...c, idList: next, pos: lastPos + i * posIncr + i }; });
      return {
        ...state,
        cards: [...cards, ...currentCardsList, ...prevCardsList]
      };
    }),
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

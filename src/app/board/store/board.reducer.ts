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
  cards: [
    new Card('1', 'Activity history', posIncr * 2 + 1, false, 'Maybe if I am really motivated...'),
    new Card('1', '[Card] Labels', posIncr * 3 + 2, false, ''),
    new Card('1', '[Card] CheckList', posIncr * 4 + 3, false, ''),
    new Card('1', '[Card] Due Time', posIncr * 5 + 4, false, ''),
    new Card('1', '[Card] Comments', posIncr * 6 + 5, false, ''),
    new Card('1', '[Animation] Draggable List', posIncr * 7 + 6, false, ''),
    new Card('1', '[Animation] Draggable Card', posIncr * 8 + 7, false, ''),
    new Card('1', '[Css] Responsive Design', posIncr * 9 + 8, false, 'Probably not... not important in this test project... A fixed width is fine here, I guess...'),
    new Card('1', '[Css] Cross browsing', posIncr * 10 + 9, false, 'I am using a mac... Probably not...'),
    new Card('1', '[Backend] NodeJS Express + MongoodB Mongoose', posIncr * 11 + 10, false, 'Maybe one day... When I will have time... ( ͡~ ͜ʖ ͡°)\nNot complicated though.'),
    new Card('3', '[Component Css] Card Edit', posIncr / 8, false, ''),
    new Card('3', '[Card Actions] Copy', posIncr / 4, false, ''),
    new Card('3', '[Card Actions] Move', posIncr / 2, false, ''),
    new Card('3', '[List Actions] Add Card / Position', posIncr, false, ''),
    new Card('3', '[List Actions] Add Card', posIncr * 2 + 1, false, ''),
    new Card('3', '[List Actions] Copy List', posIncr * 3 + 2, false, ''),
    new Card('3', '[List Actions] Move List', posIncr * 4 + 3, false, ''),
    new Card('3', '[List Actions] Watch', posIncr * 5 + 4, true, ''),
    new Card('3', '[List Actions] Sort By', posIncr * 6 + 5, false, ''),
    new Card('3', '[List Actions] Move All Cards in the list', posIncr * 7 + 6, false, ''),
    new Card('3', '[List Actions] Archive All Cards in the list', posIncr * 8 + 7, false, ''),
    new Card('3', '[List Actions] Archive the list', posIncr * 9 + 8, false, ''),
    new Card('3', '[Card Actions] Archive Card', posIncr * 10 + 9, false, ''),
    new Card('3', '[Card Actions] Delete Card', posIncr * 11 + 10, false, ''),
    new Card('3', '[Card Actions] Watch Card', posIncr * 12 + 11, false, ''),
    new Card('3', '[Store] Ngrx Store Structure', posIncr * 13 + 12, false, ''),
    new Card('3', '[Card] Description', posIncr * 14 + 13, false, 'Description of the card'),
    new Card('3', '[Model] Card', posIncr * 15 + 14, false, ''),
    new Card('3', '[Model] List', posIncr * 16 + 15, false, ''),
    new Card('3', '[Component Css] Card Create Dialog', posIncr * 17 + 16, false, ''),
    new Card('3', '[Component Css] List Actions Dropdown', posIncr * 18 + 17, false, ''),
    new Card('3', '[Component Css] Card Templates Dropdown', posIncr * 19 + 18, false, ''),
    new Card('3', '[Component Tool] Dropdown', posIncr * 20 + 19, false, ''),
    new Card('3', '[Component Tool] Dialog', posIncr * 21 + 20, false, ''),
    new Card('3', '[Component Tool] Tooltip', posIncr * 22 + 21, false, ''),
    new Card('3', '[Component Css] List', posIncr * 23 + 22, false, ''),
    new Card('3', '[Component Css] Card', posIncr * 24 + 23, false, ''),
    new Card('3', '[Component Css] Add List', posIncr * 25 + 24, false, ''),
    new Card('3', '[Component Css] Add Card', posIncr * 26 + 25, false, ''),
    new Card('3', '[Component Css] Long Name Card: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a tincidunt magna, eleifend condimentum ante. Ut non vulputate velit. Curabitur condimentum felis at posuere pulvinar.', posIncr * 27 + 26, false, ''),
  ]
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
  (cards) => cards?.filter(card => idList && card.idList === idList && !card.closed)
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
    }),
  on(BoardActions.MoveAllCards,
    (state, { prevList, list }) => {
      let prevCardsList: Card[] = [];
      const currentCardsList: Card[] = [];
      const cards = state.cards.filter(c => {
        if (c.idList === prevList.id) {
          prevCardsList.push(c);
          return false;
        } else if (c.idList === list.id) {
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
      prevCardsList = prevCardsList.map(c => { i++; return { ...c, idList: list.id, pos: lastPos + i * posIncr + i }; });
      return {
        ...state,
        cards: [...cards, ...currentCardsList, ...prevCardsList]
      };
    }),
  on(BoardActions.MoveCard,
    (state, { card, idList, position }) => {
      const prevCardsList: Card[] = [];
      const cards = state.cards.filter(c => {
        if (c.id === card.id) {
          return false;
        } else if (c.idList === idList) {
          prevCardsList.push(c);
          return false;
        } else {
          return true;
        }
      });

      const pos = calcPos(prevCardsList, position);
      return {
        ...state,
        cards: [...cards, ...prevCardsList.slice(0, position), { ...card, pos, idList }, ...prevCardsList.slice(position)]
      };
    }),
  on(BoardActions.CopyCard,
    (state, { card, name, idList, position }) => {
      const prevCardsList: Card[] = [];
      const cards = state.cards.filter(c => {
        if (c.idList === idList) {
          prevCardsList.push(c);
          return false;
        } else {
          return true;
        }
      });

      const pos = calcPos(prevCardsList, position);
      return {
        ...state,
        cards: [...cards, ...prevCardsList.slice(0, position),
        new Card(idList, name, pos, card.subscribed, card.desc), ...prevCardsList.slice(position)]
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

const move = (arr: any[], from: number, to: number) => {
  const pos = calcPos([...arr.slice(0, from), ...arr.slice(from + 1)], to);
  const item = { ...arr[from], pos };
  const clone = [...arr.slice(0, from), item, ...arr.slice(from + 1)];
  Array.prototype.splice.call(clone, to, 0,
    Array.prototype.splice.call(clone, from, 1)[0]
  );
  return clone;
};

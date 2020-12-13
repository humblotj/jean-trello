import { createReducer, createSelector, on } from '@ngrx/store';
import { List } from 'src/app/model/list.model';
import { AppState } from 'src/app/store/app.reducer';
import * as BoardActions from './board.actions';

export interface State {
  lists: List[];
}

const initialState: State = {
  lists: [new List('To Do', false, []), new List('Doing', false, []), new List('Done', false, [])]
};

export const selectBoard = (state: AppState) => state.board;

export const selectLists = createSelector(
  selectBoard,
  (state: State) => state.lists
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
    }))
);

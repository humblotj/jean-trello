import { createReducer, createSelector, on } from '@ngrx/store';
import { List } from 'src/app/model/list.model';
import { AppState } from 'src/app/store/app.reducer';
import * as BoardActions from './board.actions';

export interface State {
  lists: List[];
}

const initialState: State = {
  lists: [new List('To Do', false)]
};

export const selectBoard = (state: AppState) => state.board;

export const selectLists = createSelector(
  selectBoard,
  (state: State) => state.lists
);

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.SetLists,
    (state, { lists }) => ({ ...state, lists }))
);

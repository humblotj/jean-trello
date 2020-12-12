import { ActionReducerMap } from '@ngrx/store';

import * as fromBoard from '../board/store/board.reducer';

export interface AppState {
  board: fromBoard.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  board: fromBoard.boardReducer
};

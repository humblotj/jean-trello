import { createAction, props } from '@ngrx/store';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';

export const SetLists = createAction('[Board] Set Lists', props<{ lists: List[] }>());
export const AddList = createAction('[Board] Add List', props<{ name: string }>());
export const ArchiveList = createAction('[Board] Archive List', props<{ index: number }>());
export const RenameList = createAction('[Board] Rename List', props<{ index: number, name: string }>());
export const ToggleSubscribeList = createAction('[Board] Toggle Subscribe List', props<{ index: number }>());
export const AddCard = createAction('[Board] Add Card', props<{ card: Card }>());
export const ArchiveAllCards = createAction('[Board] Archive All Cards', props<{ idList: string }>());
export const EditCard = createAction('[Board] Edit Card', props<{ card: Card }>());
export const DeleteCard = createAction('[Board] Delete Card', props<{ card: Card }>());
export const CopyList = createAction('[Board] Copy List', props<{ name: string, idList: string }>());
export const MoveList = createAction('[Board] Move List', props<{ prevPos: number, pos: number }>());
export const SortCards = createAction('[Board] Sort Cards', props<{ idList: string, sortBy: 'newest' | 'oldest' | 'alphabetically' }>());
export const MoveAllCards = createAction('[Board] Move All Cards', props<{ prevList: List, list: List }>());
export const MoveCard = createAction('[Board] Move Card', props<{ card: Card, idList: string, position: number }>());
export const CopyCard = createAction('[Board] Copy Card', props<{ card: Card, name: string, idList: string, position: number }>());

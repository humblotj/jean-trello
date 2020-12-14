import { createAction, props } from '@ngrx/store';
import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';

export const SetLists = createAction('[Board] Set Lists', props<{ lists: List[] }>());
export const AddList = createAction('[Board] Add List', props<{ list: List }>());
export const ArchiveList = createAction('[Board] Archive List', props<{ index: number }>());
export const RenameList = createAction('[Board] Rename List', props<{ index: number, name: string }>());
export const ToggleSubscribeList = createAction('[Board] Toggle Subscribe List', props<{ index: number }>());
export const AddCard = createAction('[Board] Add Card', props<{ idList: string, index: number, name: string }>());
export const ArchiveAllCards = createAction('[Board] Archive All Cards', props<{ idList: string }>());
export const EditCard = createAction('[Board] Edit Card', props<{ card: Card }>());
export const DeleteCard = createAction('[Board] Delete Card', props<{ card: Card }>());

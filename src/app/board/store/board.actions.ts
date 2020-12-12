import { createAction, props } from '@ngrx/store';
import { List } from 'src/app/model/list.model';

export const SetLists = createAction('[Board] Set Lists', props<{ lists: List[] }>());


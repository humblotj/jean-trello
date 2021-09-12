import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { BoardComponent } from './board.component';
import { ListComponent } from './list/list/list.component';
import { CardComponent } from './card/card/card.component';
import { AddListComponent } from './list/add-list/add-list.component';
import { CardCreateComponent } from './card/card-create/card-create.component';
import { CardEditDialogModule } from './card/card-edit-dialog/card-edit-dialog.module';
import { CardEditComponent } from './card/card-edit/card-edit.component';
import { BoardEffects } from './store/board.effects';

const routes: Routes = [
  { path: '', component: BoardComponent }
];

@NgModule({
  declarations: [BoardComponent, ListComponent, CardComponent, AddListComponent, CardCreateComponent, CardEditComponent],
  imports: [
    SharedModule,
    CardEditDialogModule,
    DragDropModule,
    EffectsModule.forRoot([BoardEffects]),
    RouterModule.forChild(routes)
  ]
})
export class BoardModule { }

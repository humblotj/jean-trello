import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { BoardComponent } from './board.component';
import { ListComponent } from './list/list/list.component';
import { CardComponent } from './card/card/card.component';
import { AddListComponent } from './list/add-list/add-list.component';
import { CardCreateComponent } from './card/card-create/card-create.component';
import { CardEditDialogModule } from './card/card-edit-dialog/card-edit-dialog.module';
import { CardEditComponent } from './card/card-edit/card-edit.component';

const routes: Routes = [
  { path: '', component: BoardComponent }
];

@NgModule({
  declarations: [BoardComponent, ListComponent, CardComponent, AddListComponent, CardCreateComponent, CardEditComponent],
  imports: [
    SharedModule,
    CardEditDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardModule { }

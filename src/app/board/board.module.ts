import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { BoardComponent } from './board.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './list/card/card.component';
import { AddListComponent } from './add-list/add-list.component';
import { CardCreateComponent } from './list/card-create/card-create.component';
import { CardEditDialogModule } from './card-edit-dialog/card-edit-dialog.module';

const routes: Routes = [
  { path: '', component: BoardComponent }
];

@NgModule({
  declarations: [BoardComponent, ListComponent, CardComponent, AddListComponent, CardCreateComponent],
  imports: [
    SharedModule,
    CardEditDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';

import { SharedModule } from '../shared/shared.module';

import { BoardComponent } from './board.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './list/card/card.component';
import { AddListComponent } from './add-list/add-list.component';
import { CardCreateComponent } from './list/card-create/card-create.component';

const routes: Routes = [
  { path: '', component: BoardComponent }
];

@NgModule({
  declarations: [BoardComponent, ListComponent, CardComponent, AddListComponent, CardCreateComponent],
  imports: [
    SharedModule,
    TextFieldModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardModule { }

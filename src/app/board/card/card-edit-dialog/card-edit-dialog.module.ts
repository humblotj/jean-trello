import { NgModule } from '@angular/core';
import { CardEditDialogComponent } from './card-edit-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CardEditDialogComponent],
  imports: [
    SharedModule
  ],
  exports: [CardEditDialogComponent]
})
export class CardEditDialogModule { }

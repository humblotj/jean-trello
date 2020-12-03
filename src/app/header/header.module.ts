import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    SharedModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from './button/button.component';
import { ButtonCancelComponent } from './button-cancel/button-cancel.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  declarations: [ButtonComponent,
    ButtonCancelComponent,
    IconComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    ButtonComponent,
    ButtonCancelComponent,
    IconComponent
  ]
})
export class SharedModule { }

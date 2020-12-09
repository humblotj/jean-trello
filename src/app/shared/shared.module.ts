import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from './button/button.component';
import { ButtonCancelComponent } from './button-cancel/button-cancel.component';
import { IconComponent } from './icon/icon.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
  declarations: [ButtonComponent,
    ButtonCancelComponent,
    IconComponent,
    DropdownComponent,
    TooltipComponent,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    OverlayModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    ButtonComponent,
    ButtonCancelComponent,
    IconComponent,
    DropdownComponent,
    TooltipDirective
  ]
})
export class SharedModule { }
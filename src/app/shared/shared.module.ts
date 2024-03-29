import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ButtonComponent } from './button/button.component';
import { ButtonCancelComponent } from './button-cancel/button-cancel.component';
import { IconComponent } from './icon/icon.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { OverlayComponent } from './overlay/overlay.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReactiveComponentModule } from '@ngrx/component';
import { SelectFormComponent } from './select-form/select-form.component';
import { LinkComponent } from './link/link.component';

@NgModule({
  declarations: [ButtonComponent,
    ButtonCancelComponent,
    IconComponent,
    DropdownComponent,
    TooltipComponent,
    TooltipDirective,
    OverlayComponent,
    SelectFormComponent,
    LinkComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    OverlayModule,
    TextFieldModule,
    ReactiveComponentModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TextFieldModule,
    ReactiveComponentModule,
    MatIconModule,
    ButtonComponent,
    ButtonCancelComponent,
    IconComponent,
    DropdownComponent,
    TooltipDirective,
    SelectFormComponent,
    LinkComponent,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { DynamicContainerComponent } from './components/dynamic-container.component';
import { NgbAlertModule, NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DynamicDialogComponent } from './components/dynamic-dialog/dynamic-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CRUDTableModule } from 'src/app/_core/shared/crud-table';
import { DirectivesModule } from 'src/shared/directives/directive.module';
import { MaterialModule } from 'src/shared/components/Material/MaterialModule';
import { FiltersComponent } from './components/filters-component/filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [DynamicContainerComponent, DynamicDialogComponent, FiltersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    MatTooltipModule,
    DirectivesModule,
  ],

   exports: [
    DynamicContainerComponent,
    DynamicDialogComponent
  ]
})
export class DynamicContainerModule { }

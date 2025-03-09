import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { MaterialModule } from '../Material/MaterialModule';
import { VehicleTypesComponent } from './vehicle-types.component';

@NgModule({
    imports: [CommonModule, FormsModule,
        ReactiveFormsModule, MaterialModule],
    declarations: [VehicleTypesComponent],
    exports: [VehicleTypesComponent],
})
export class VehicleTypesModule { }

import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VehicleTypesService } from 'src/shared/services/vehicle-types.service';

@Component({
    selector: 'app-vehicle-types',
    templateUrl: './vehicle-types.component.html',
    styleUrls: ['./vehicle-types.component.scss'],
})
export class VehicleTypesComponent implements OnInit {
    constructor(private vehicleTypesService: VehicleTypesService) { }
    @Input() controlName: string;
    @Input() isSearch = false;
    @Input() FormGroup: FormGroup;
    dataTypes;

    vehicleTypeDataSource$: Observable<any> = new Observable<any>();
    onChangeValue(event: any): void {
        if (event && event.value !== undefined) {
            const id = event.value;
            console.log(id);
        }
    }
    ngOnInit() {
        this.vehicleTypeDataSource$ = this.vehicleTypesService.getVehicleTypes();
     }
    controlHasError(validation): boolean {
        const control = this.FormGroup.controls[this.controlName];
        return control.hasError(validation) && (control.dirty || control.touched);
    }
    isControlInvalid(): boolean {
        const control = this.FormGroup.controls[this.controlName];

        return (
            control.invalid &&
            (control.hasError('pattern') || control.hasError('email') || control.hasError('invalid'))
        );
    }
}

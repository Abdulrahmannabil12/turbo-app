import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minVal(val: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        control.value < val
            ? { InvalidMinVal: control.value } : null;
}
export function maxVal(val: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        control.value > val
            ? { InvalidMaxVal: control.value } : null;
}

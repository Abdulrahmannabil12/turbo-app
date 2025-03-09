import { Component, OnInit, Input, Output, forwardRef, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomDatepicker),
    multi: true
};

export const CUSTOM_INPUT_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CustomDatepicker),
    multi: true,
};

const noop = () => { };

const ISODatePattern = new RegExp(
    '^(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$'
);

/** @title Basic datepicker */
@Component({
    selector: 'custom-datepicker',
    template: '',
    styles: [''],
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
        CUSTOM_INPUT_VALIDATOR
    ],
})
export class CustomDatepicker implements ControlValueAccessor, Validator {
    public mask = {
        guide: false,
        showMask: true,
        mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
    };

    innerValue: string = '';
    @ViewChild('date') _input: ElementRef;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    get value(): string {
        // console.log('get value', this.innerValue);
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: string) { 
        if (v !== this.innerValue) {
            this.innerValue = v;
        } 
    }

    isValid(value: string) {
        return value === '' || (
            ISODatePattern.test(value) && value === (new Date(value)).toISOString().substr(0, 10)
        );
    }

    validate(c: FormControl) {
        return this.isValid(this.innerValue) ? null : {
            invalidDateError: {
                valid: false,
            },
        };
    }

    //Occured value changed from module
    writeValue(value: any): void { 
        if (value !== this.innerValue) {
            this.innerValue = value;
            this._input.nativeElement.value = this.innerValue;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    fromPicker(event: Date) {
         this.value = event.toISOString().substr(0, 10);
        this.onChangeCallback(this.value);
    }

    fromInput(value: string) {
         this.value = value;
        this.onChangeCallback(this.value);
    }
}

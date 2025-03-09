import { Directive, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '([formControlName], [formControl])[disableControl]' })
export class DisableControlDirective implements OnInit {
    @Input() disableControl;

    ngOnInit() {
 
        if (this.disableControl) {
            this.ngControl.control?.disable();
            this.ngControl.control?.setValue('');

        } else if (this.disableControl === false) {
            this.ngControl.control?.enable();
            if (!this.ngControl.control.value) {
                this.ngControl.control.setValue(0);
            }
        }
    }

    constructor(private ngControl: NgControl) { }
}

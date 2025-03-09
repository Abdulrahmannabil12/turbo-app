import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonWithSpinnerComponent } from './button-with-spinner.component';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
    declarations: [ButtonWithSpinnerComponent],
    imports: [CommonModule,InlineSVGModule],
    exports: [ButtonWithSpinnerComponent]
})
export class ButtonWithSpinnerModule { }

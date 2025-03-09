import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Material/MaterialModule';
import { CompanySearchComponent } from './company-search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule],
    declarations: [CompanySearchComponent],
    exports: [CompanySearchComponent],
})
export class CompanySearchModule { }

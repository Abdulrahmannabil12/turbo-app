import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CompanySearchService } from 'src/shared/services/company-search/company-search.service';
import { Company } from 'src/shared/model/company/company.model';
import { ContractTypeEnum } from 'src/shared/enums/contract-type.enum';

@Component({
    selector: 'app-company-search',
    templateUrl: './company-search.component.html',
    styleUrls: ['./company-search.component.scss'],
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective },
    ],
})
export class CompanySearchComponent implements OnInit {
    constructor(private companySearchService: CompanySearchService) { }
    @Input() controlName: string;
    @Input() controlNameId: string;
    @Output() companyContractTypeChanged: EventEmitter<number> = new EventEmitter<number>();
    @Input() FormGroup: FormGroup;
    @Input() CompanyDetails: Company;
    @Input() clearFormOnChange: boolean;
    @Output() CompanyDetailsChange: EventEmitter<Company> = new EventEmitter<Company>();
    companyTypeId?: number = null;
    filteredCompanies$: Observable<any> = new Observable<any>();
    contractTypeEnum = ContractTypeEnum;
    isLoading$: any;

    ngOnInit() {
        this.isLoading$ = this.companySearchService.isLoading$;
        if (this.FormGroup.get(this.controlNameId).value) {
            this.getCompanyDataOnEdit(this.FormGroup.get(this.controlNameId).value);

        } else {
            this.companyTypeId = this.contractTypeEnum.I_InSource;
            this.submitFirstInSourceCompany();
        }
        this.companyContractTypeChanged.emit(this.companyTypeId);

        this.searchOnCompany();
    }
    checkCompanyId() {
        const controlName = this.FormGroup.get(this.controlName);
        const controlNameId = this.FormGroup.get(this.controlNameId);


        if (controlName.errors && !controlName.errors.InvalidCompanyId) {
            return;
        }

        if (!controlNameId.value) {
            controlName.setErrors({ InvalidCompanyId: true });
        } else {
            controlName.setErrors(null);
        }
    }

    companyContractChanged(event) {
        if (event.value === this.contractTypeEnum.I_InSource) {
            this.submitFirstInSourceCompany();
        } else {
            this.FormGroup.get(this.controlNameId).setValue(null);
            this.FormGroup.get(this.controlName).setValue(null);
        }

        this.companyContractTypeChanged.emit(event.value);

    }
    submitFirstInSourceCompany() {
        this.FormGroup.get(this.controlName).setValue('');
        this.companySearchService.getCompaniesByCompanyNameAndType('', this.companyTypeId).subscribe(res => {
            this.FormGroup.get(this.controlNameId).setValue(res['data'][0].id);
            this.FormGroup.get(this.controlName).setValue(res['data'][0].nameEn + ' - ' + res['data'][0].nameAr);
        });

    }
    searchInputChange() {
        this.FormGroup.get(this.controlNameId).setValue(null);
        this.FormGroup.get(this.controlName).setValue(null);
    }
    getCompanyDataOnEdit(companyId) {
        this.companySearchService.getItemById(companyId).subscribe(res => {
            this.CompanyDetails = res['data'];
            if (this.CompanyDetails) {
                this.FormGroup.get(this.controlName).setValue(this.CompanyDetails.nameEn + ' - ' + this.CompanyDetails.nameAr);
                this.companyTypeId = this.CompanyDetails.contractTypeId;
                this.companyContractTypeChanged.emit(this.CompanyDetails.contractTypeId);
                this.CompanyDetailsChange.emit(this.CompanyDetails);
            }

        });
    }
    searchOnCompany() {
        this.filteredCompanies$ = this.FormGroup.get(this.controlName).valueChanges.pipe(
            debounceTime(400),
            switchMap((companyName: string) => {
                if (this.companyTypeId) {
                    return this.companySearchService.getCompaniesByCompanyNameAndType(companyName, this.companyTypeId);
                }
            }
            )
        );
    }
    setSelectedCompanyObject(company) {
        if (company) {
            this.CompanyDetails = company;
            this.CompanyDetailsChange.emit(this.CompanyDetails);
            this.FormGroup.get(this.controlNameId).setValue(company.id);
            this.FormGroup.get(this.controlName).setValue(company.nameEn + ' - ' + company.nameAr);
            this.companyTypeId = company.contractTypeId;

        }
    }
    isControlValid(controlName: string): boolean {
        const control = this.FormGroup.controls[controlName];
        return control.valid && (control.dirty || control.touched);
    }
    controlHasError(validation, controlName): boolean {
        const control = this.FormGroup.controls[controlName];
        return control.hasError(validation) && (control.dirty || control.touched);
    }


}

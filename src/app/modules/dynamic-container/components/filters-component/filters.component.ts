import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BaseTableService } from 'src/app/_core/shared/crud-table/services/base.table.service';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_core/shared/utils/date-picker.utils';
import { FilterControlModel } from 'src/shared/model/FilterControl.model';
@Component({
  selector: 'app-dynamic-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class FiltersComponent implements OnInit {
  @Input()
  service: BaseTableService<any> = {} as BaseTableService<any>;
  @Input()
  filtersDataSource: Array<FilterControlModel> = [];
  @Input() filterFormGroup: FormGroup;

  filterCheckboxSuffix = '_checkBox';
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.filtersDataSource && this.filtersDataSource.length > 0) {
      this.filterFormGroup = this.createGroup(this.filtersDataSource)
      this.service.patchFilter(this.filterFormGroup.value);
      this.filterFormGroup.valueChanges.pipe(debounceTime(500))
        .subscribe(() => {
          this.service.patchFilter(this.filterFormGroup.value);
        });
    } else {
      this.service.patchStateWithoutFetch({ filter: this.filterFormGroup.value });
    }
  }

  filtersChanged(event: any, filterControl: FilterControlModel) {

    if (!event.target.checked) {
      this.getControl(filterControl.controlName)?.setValue(null)
    }
  }


  createGroup(controlsArray: Array<FilterControlModel>): FormGroup {
    const form = new FormGroup({})

    controlsArray.forEach(control => {
      const checkBoxControl = control.controlName + this.filterCheckboxSuffix
      const checkBoxValue = control.required ? { value: control.isVisible, disabled: true } : control.isVisible;
      form.addControl(checkBoxControl, new FormControl(checkBoxValue))
      form.addControl(control.controlName, new FormControl(control.controlValue))



    })

    return form
  }
  getControl(controlName: string): FormControl {
    return this.filterFormGroup.get(controlName) as FormControl
  }

}

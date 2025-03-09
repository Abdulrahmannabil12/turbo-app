import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ObjectHasValue } from 'src/shared/helper/helper';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-group-material',
  templateUrl: './form-group-material.component.html',
  styleUrls: ['./form-group-material.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [
      transition(':enter', [animate('700ms linear', style({ opacity: 0 }))]),
    ]),
  ],
})
export class FormGroupMaterialComponent implements OnInit, AfterViewInit {
  inputPassword?: boolean;
  hide = true;

  @Input() fieldLabel: string;
  @Input() error: any;
  @Input() requiredError:string;
  @Input() isSearch: boolean = false;
  @Input() fieldMinLength: number;
  @Input() fieldMaxLength: number;
  @Input() FormGroup: FormGroup = new FormGroup({});
  @Input() hint: string;
  @Input() isRtl: Boolean;
  @Input() inputType: string;
  @Input() OnlyNumber: boolean = false;
  @Input() maxlengthLimit: number = null!;
  @Input() inputPlaceholder: string;
  @Input() data: any;
  @Input() controlName: string='';
  @Input() dataSource?: any = null!;
  @Input() matSuffix?: string;
  @Input() maxValue: number;
  @Input() minValue: number;
  @Input() minimumValueNumber?: number = null!;
  @Input() MaximumValueNumber?: number = null!;
  @Input() requiredField?: boolean;
  @Input() matPrefix?: string;
  @Input() matPrefixIcon?: string;
  @Input() lazyInput?: boolean;
  @Input() isLogin?: boolean;
  @Input() fieldName = 'Name';
  @Input() fieldValue = 'Id';

  @Output() changeValue: EventEmitter<number>;

  constructor() {
    this.fieldLabel = '';
    this.fieldMinLength = undefined!;
    this.fieldMaxLength = undefined!;
    this.hint = '';
    this.inputType = '';
    this.inputPlaceholder = '';
    this.controlName = '';
    this.dataSource = [];
    this.maxValue = null!;
    this.minValue = null!;
    this.changeValue = new EventEmitter();
  }

  ngOnInit(): void {
    this.inputType === 'password'
      ? (this.inputPassword = true)
      : (this.inputPassword = false);
    if (this.dataSource && this.dataSource.length > 0 && !this.isSearch){
      this.dataSource = this.dataSource.filter((item:any)=>item.Id)
    }
  }
  ngAfterViewInit(): void {

  }
  onChangeValue(event: any): void {
    if (event && event.value !== undefined) {
      const id = event.value;
      this.changeValue.emit(+id);
    }
  }
  isControlValid(): boolean {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(): boolean {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];
    return (
      control.invalid &&
      (control.hasError('pattern') || control.hasError('email') || control.hasError('invalid'))
    );
  }
  controlHasWhiteSpace(): string {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];
    if (control.hasError('trimError')) {
      return control.getError('trimError').value;
    }
    return null!
  }

  controlHasError(validation: any): boolean {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];

    return (control.hasError(validation) ||control.getError(validation)) && (control.dirty || control.touched);
  }

  isControlTouched(): boolean {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];

    return control.dirty || control.touched;
  }
  controlHasMinValError(): boolean {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];
    return control.hasError('InvalidMinVal') && (control.dirty || control.touched);
  }
  controlIsDisabled(): boolean {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];
    return control.disabled ? true : false;
  }
  controlHasMaxValError() {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];
    return control.hasError('InvalidMaxVal') && (control.dirty || control.touched);
  }
  isControlTouchedValid(): boolean {
    if (!ObjectHasValue(this.FormGroup.value)) {
      return undefined!;
    }
    const control = this.FormGroup?.controls[this.controlName];
    return control.valid;
  }

}

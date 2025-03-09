import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent implements OnInit {
  @Input() fieldLabel: string;
  @Input() inputType: string;
  @Input() inputPlaceholder: string;
  @Input() className: string;
  @Input() haveButton: boolean;
  @Input() disabled: boolean;
  @Input() control: FormControl;
  @Input() dataSource: any[];
  @Output() changeValue: EventEmitter<number>;

  constructor() {
    this.fieldLabel = '';
    this.inputType = '';
    this.inputPlaceholder = '';
    this.className = '';
    this.haveButton = false;
    this.control = new FormControl();
    this.dataSource = [];
    this.disabled = false;
    this.changeValue = new EventEmitter();
  }

  ngOnInit(): void {}

  onChangeValue(event: any) {
    if (event && event.target) {
      const id = event.target.value;
      this.changeValue.emit(+id);
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ObjectHasValue } from 'src/app/shared/helper/helper';

@Component({
  selector: 'app-error-details',
  templateUrl: './error-details.component.html',
  styleUrls: ['./error-details.component.scss'],
})
export class ErrorDetailsComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('errors') errors: any;
  keys: string[];
  constructor() {
    this.keys = [];
    this.errors = {};
  }

  ngOnInit(): void {
    if (ObjectHasValue(this.errors)) {
      this.keys = Object.keys(this.errors);
    }
  }
}

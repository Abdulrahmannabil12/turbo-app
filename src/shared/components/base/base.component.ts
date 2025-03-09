import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  template: ``,
})
export class BaseComponent implements OnInit {

  pageSize: number = 5;
  rowsCount: number;

  constructor() {}

  ngOnInit(): void {}

}

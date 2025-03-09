import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('CollectionSize')
  collectionSize = 0;

  @Input()
  page = 1;

  @Output()
  pageChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  updatePage(event: any): void {
    this.pageChange.emit(event);
  }
}

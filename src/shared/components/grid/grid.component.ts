import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input()
  dataSource = [] as any[];

  @Input()
  fields = [] as { field: string; header: string }[];

  displayedColumns: string[] = [] as string[];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = [...this.fields.map(f => f.field), 'actions'];
  }
  editElement(element: any) {
    this.edit.emit(element);
  }
  deleteElement(element: any) {
    this.delete.emit(element);
  }
}

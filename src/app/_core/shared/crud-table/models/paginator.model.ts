export const PageSizes = [3, 5, 10, 15, 50, 100];

export interface IPaginatorState {
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  recalculatePaginator(totalRecords: number): IPaginatorState;
}

export class PaginatorState implements IPaginatorState {
  pageIndex:number = 1;
  pageSize = PageSizes[2];
  totalRecords = 0;
  pageSizes: number[] = [];

  recalculatePaginator(totalRecords: number): PaginatorState {
    this.totalRecords = totalRecords;
    return this;
  }
}

export interface IPaginatorView {
  paginator: PaginatorState;
  ngOnInit(): void;
  paginate(paginator: PaginatorState): void;
}

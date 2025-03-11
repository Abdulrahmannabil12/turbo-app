import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject, Subscription } from "rxjs";
import { DynamicDialogComponent } from "./dynamic-dialog/dynamic-dialog.component";
import { Router } from "@angular/router";
import {
  PaginatorState,
  SortState,
  GroupingState,
} from "src/app/_core/shared/crud-table";
import { BaseTableService } from "src/app/_core/shared/crud-table/services/base.table.service";

import { debounceTime } from "rxjs/operators";
import { FilterControlModel } from "src/shared/model/FilterControl.model";
import { ResponseData } from "src/app/_core/shared/crud-table/models/response-data.model";
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: "app-dynamic-container",
  templateUrl: "./dynamic-container.component.html",
  styleUrls: ["./dynamic-container.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('expandCollapse', [
      state('void', style({ opacity: 0, height: '0px', width: '0px' })),
      state('*', style({ opacity: 1, height: '*', width: '*' })),
      transition(':enter', [
        style({ opacity: 0, height: '0px', width: '0px' }),
        animate('200ms ease-in-out', style({ opacity: 1, height: '*', width: '*' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0, height: '0px', width: '0px' }))
      ])])
  ]
})

export class DynamicContainerComponent<T>
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("tableScroll") TableScroll: ElementRef;
  @Input()
  PageTitle = "";
  @Input()
  service: BaseTableService<any> = {} as BaseTableService<any>;
  @Input()
  btnURL?: string;
  @Input()
  showResetPassword = false;
  @Input()
  validExportData = true;
  @Input()
  NoDialog = false;
  @Input()
  isEditable = false;
  @Input()
  isDeletable = false;
  @Input()
  isViewable = false;
  @Input()
  hasReject = false;
  @Input()
  hasApprove = false;
  @Input()
  isReports = false;
  @Input() isAssignable = false
  @Input()
  isDuplicateOption = false;
  @Input()
  filtersDataSource: Array<FilterControlModel> = [];
  @Input()
  columns: {
    header: string;
    field: string;
    type?: string;
    width?: number;
    image?: string;
    dataSourceEnum?: any;
  }[] = [];
  @Output() openDialog: EventEmitter<{
    isEdit: boolean;
    isShow: boolean;
    isDuplicate: boolean;
    isAssign?: boolean
    item: T;
  }> = new EventEmitter();
  @Output() deleteEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() resetPasswordEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() getReport: EventEmitter<{ getReport: boolean }> =
    new EventEmitter();

  @Input()
  routerLinkRoute = "";
  @Input()
  routerLinkParam: string | Array<string>;

  dataSource = [] as T[];
  paginator: PaginatorState = {} as PaginatorState;
  sorting: SortState = {} as SortState;
  grouping: GroupingState = {} as GroupingState;
  isLoading?: boolean;
  isReportLoading?: boolean;
  filterGroup: FormGroup = {} as FormGroup;
  searchGroup: FormGroup = {} as FormGroup;
  private subscriptions: Subscription[] = [];
  activeCol?: string;
  public focusedRowIndex = -1;
  isExpanded: boolean[] = [];

  get serviceIsNotEmpty(): boolean {
    return this.service && Object.keys(this.service).length > 0;
  }

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.serviceIsNotEmpty) {
      this.service.fetch({
        hasFilters: this.filtersDataSource && this.filtersDataSource.length > 0,
      });
      this.grouping = this.service.grouping;
      this.paginator = this.service.paginator;
      this.sorting = this.service.sorting;

      const sb = this.service.isLoading$.subscribe(
        (res: boolean | undefined) => (this.isLoading = res)
      );

      this.columns = this.service.getTableHeaderAndFields();
    }
  }
  ngAfterViewInit() { }
  getDataSourceEnumVal(key: any, dataSourceEnum: Array<any>) {
    const displayExpr = dataSourceEnum.find(
      (fieldItem: any) => fieldItem.key == key
    )?.value;
    return displayExpr ? displayExpr : "-";
  }
  View(item: T) {
    this.openDialog.emit({
      isEdit: false,
      isDuplicate: false,
      isShow: true,
      item,
    });
  }
  getMasterHeaders(cols: Array<any>) {
    return (cols.filter(item => item.type === 'masterDetails'))[0]
  }
  toggleExpand(index: number) {
    console.log(this.isExpanded[index])
    if (this.isExpanded[index] === undefined) {
      this.isExpanded.splice(index, 0, false);

    }
    console.log(this.isExpanded[index])

    this.isExpanded[index] = !this.isExpanded[index];

  }
  public onRowClick(rowIndex: number) {
    this.focusedRowIndex = rowIndex;
  }
  getItemField(item: any, field: string) {
    if (field.includes(".")) {
      const itemArr = field.split(".");
      const parentItem = item[itemArr[0]];
      return parentItem[itemArr[1]];
    } else {
      return typeof item[field] == "boolean" ? item[field] : (item[field] || "-");
    }
  }
  ViewRouter(routerLink: string, item: any) {


    let link;
    let param: string = "";
    if (Array.isArray(this.routerLinkParam)) {
      this.routerLinkParam.forEach((paramSTR) => {
        if (paramSTR.includes(".")) {
          const paramArr = paramSTR.split(".");
          const parentItem = item[paramArr[0]];
          param = param + "/" + parentItem[paramArr[1]];
        } else {
          param = param + "/" + item[paramSTR];
        }
      });
    } else {
      param = item[this.routerLinkParam];
    }
    link = routerLink + "/view/" + param;

    this.router.navigate([link]);
  }
  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = "asc";
    } else {
      sorting.direction = sorting.direction === "asc" ? "desc" : "asc";
    }
    this.activeCol = column;
    this.service.patchState({ sorting }, true);
  }

  // pagination
  paginate(pagination: PaginatorState) {
    this.sorting.column = null!;
    this.service.patchState({ pagination });
  }

  ngOnDestroy() {
    this.service.setDefaults();
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  search(searchTerm: string) {
    this.service.patchState({ searchTerm });
  }
  ExtractReport() {
    this.getReport.emit({ getReport: true });
  }
  invalidExportData(): boolean {
    return this.validExportData;
  }
  updateStatusForSelected() { }

  // actions
  // these will run for all dynamic modules
  deleteItem(id: number) {
    const modalRef = this.modalService.open(DynamicDialogComponent);
    modalRef.componentInstance.id = id;
    this.setDefaultValues(modalRef);
    modalRef.result.then(
      () => this.service.fetch(),
      () => { }
    );
  }

  // these will run for all dynamic modules
  deleteSelected() {
    const modalRef = this.modalService.open(DynamicDialogComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    this.setDefaultValues(modalRef);
    modalRef.result.then(
      () => this.service.fetch(),
      () => { }
    );
  }

  openAddEditDialog(isEdit = false, item: T): void {
    this.openDialog.emit({ isEdit, isDuplicate: false, isShow: false, item });
  }
  openAssignDialog(isAssign = true, item: T): void {
    this.openDialog.emit({ isEdit: false, isDuplicate: false, isShow: false, item, isAssign });
  }
  openDuplicateDialog(item: T): void {
    this.openDialog.emit({
      isEdit: false,
      isShow: false,
      isDuplicate: true,
      item,
    });
  }

  resetPassword(element: any): void {
    this.resetPasswordEventEmitter.emit(element);
  }

  private setDefaultValues(modalRef: any): void {
    modalRef.componentInstance.title = this.PageTitle;
    modalRef.componentInstance.service = this.service;
  }
}

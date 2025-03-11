import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, finalize, of, tap } from 'rxjs';
import { BaseModel } from 'src/app/_core/shared/crud-table';
import { BaseTableService } from 'src/app/_core/shared/crud-table/services/base.table.service';
import { SessionService } from 'src/shared/services/LocalStorage/session.service';
import { NotificationService } from 'src/shared/services/notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseTableService<any> {
  url = 'doctor/';
  controller: string;
  customFetchApi: string;
  constructor(httpClient: HttpClient, notify: NotificationService, sessionService: SessionService) {
    super(httpClient, notify, sessionService);
    this.controller = 'Doctor';
    this.customFetchApi = 'GetAll';
  }
  fetch(props?: any) {


    if (props) {
      const { hasFilters } = props;
      const filtersArr = Object.entries(this._tableState$.value['filter'])
      if (filtersArr.length <= 0 && hasFilters) {
        return
      }

    }
    this._isLoading$.next(true);
    this._errorMessage.next('');

    return of({
      data: [{
        id: "",
        name: 'dafafadfa',
        isActive: true,
        description: "sg",
      },{
        id: "",
        name: 'dafafadfa',
        isActive: false,
        description: "sg",
      },{
        id: "",
        name: 'dafafadfa',
        isActive: true,
        description: "sg",
      },{
        id: "",
        name: 'dafafadfa',
        isActive: false,
        description: "sg",
      },{
        id: "",
        name: 'dafafadfa',
        isActive: true,
        description: "sg",
      },],
      total: 45,
      totalRecords: 20
    })
      .pipe(
        tap((res: any) => {
          const DATA = res.data || res.users;
          this.data = DATA
          this._items$.next(DATA);
          const totalRecords = res.totalRecords || res.total;
          this.patchStateWithoutFetch({
            pagination:
              this._tableState$.value.pagination.recalculatePaginator(
                totalRecords
              ),
          });
        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            items: [],
            totalRecords: 0,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._items$.value.map((el: any) => {
            const item = el as unknown as BaseModel;
            return item.id;
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe(e => console.log(e)
      )

    const request = this.find(this._tableState$.value)



  }
  getTableHeaderAndFields() {
    return [
      { field: 'name', header: 'Name' },
      { field: 'isActive', header: 'Description', type: 'boolean' },
      { field: 'description', header: 'Description' },


    ];
  }

}

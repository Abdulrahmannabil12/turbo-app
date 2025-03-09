import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseTableService } from 'src/app/_core/shared/crud-table/services/base.table.service';
import { Observable, of } from 'rxjs';
import { ResponseData } from 'src/app/_core/shared/crud-table/models/response-data.model';
import { SessionService } from 'src/shared/services/LocalStorage/session.service';
import { NotificationService } from 'src/shared/services/notification/notification.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { NameId } from '../model/NameId.model';

@Injectable({
  providedIn: 'root'
})

export class LookupService extends BaseTableService<any> {
  httpService: any;

  constructor(@Inject(HttpClient) http: HttpClient, notify: NotificationService, sessionService: SessionService) {
    super(http, notify, sessionService);
  }

  fetchLookup(lookupController: string): Observable<Array<NameId>> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/LookUp/${lookupController}`;
    return this.http.get(url).pipe(
      map((data: any) => {

        return data.map((item: any) => {
          return {
            Id: item.id,
            Name: item.name,

          };
        });
      }),
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('COULD NOT FETCH SELECTED ITEMS', err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

}

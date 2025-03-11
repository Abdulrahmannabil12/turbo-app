import { BaseTableService } from 'src/app/_core/shared/crud-table/services/base.table.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/shared/services/LocalStorage/session.service';
import { NotificationService } from 'src/shared/services/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class TableExtendedService extends BaseTableService<any> {
  constructor(@Inject(HttpClient) http: HttpClient, notify: NotificationService, sessionService: SessionService) {
    super(http, notify, sessionService);
  }
}

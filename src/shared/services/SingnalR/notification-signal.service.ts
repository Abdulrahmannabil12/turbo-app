import { Injectable } from '@angular/core';
import { HubConnectionEnum } from 'src/shared/enums/hub-connection.enum';
import { SessionService } from '../LocalStorage/session.service';
import { BaseSignalService } from './base-signal.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationSignalService extends BaseSignalService {

  constructor(sessionService: SessionService) {
    super(sessionService);
    this.hubConnectionSelected = HubConnectionEnum.NotificationHub;
    this.createConnection();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  constructor(private http: HttpClient) { }

  getTimezone(): Promise<string> {
    return this.http.get('https://worldtimeapi.org/api/ip')
      .toPromise()
      .then((response: any) => response.timezone)
      .catch(() => 'UTC');
  }

  setDefaultTimezone(timezone: string) {
    moment.tz.setDefault(timezone);
  }
}

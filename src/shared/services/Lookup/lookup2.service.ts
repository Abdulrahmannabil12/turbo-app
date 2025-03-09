import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_core/shared/crud-table/services/http.service';
import { environment } from 'src/environments/environment';
import { KeyValue } from 'src/shared/model/KeyValuemodel';
import { MethodResult } from 'src/shared/model/MethodResult';

@Injectable({
  providedIn: 'root'
})
export class Lookup2Service {
  domain = environment.apiUrl;
  controller = "lookup"
  constructor(private service: HttpService) {
  }

  getTemplateTypes(): Observable<MethodResult<KeyValue[]>> {
    return this.service.get(`${this.controller}/GetTemplateTypes`);
  }
}

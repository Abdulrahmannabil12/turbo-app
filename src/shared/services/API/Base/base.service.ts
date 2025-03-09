import { ResponseData } from 'src/app/_core/shared/crud-table/models/response-data.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  controller = '';
  constructor(private httpService: HttpService) {}

  getAll(): Observable<ResponseData<T[]>> {
    return this.httpService.get<ResponseData<T[]>>(
      `${this.controller}/GetAll`
    );
  }

  getById(obj: T, idField = 'Id'): Observable<T> {
    const item = (obj as any)[idField];
    return this.httpService.get<T>(
      `${this.controller}/GetById/${item}`
    );
  }

  insert(obj: T): Observable<T> {
    return this.httpService.post<T>(
      `${this.controller}/Insert/`,
      obj
    );
  }

  update(obj: T): Observable<T> {
    return this.httpService.post<T>(
      `${this.controller}/Update/`,
      obj
    );
  }

  delete(obj: T): Observable<T> {
    return this.httpService.post<T>(
      `${this.controller}/Delete/`,
      obj
    );
  }
}

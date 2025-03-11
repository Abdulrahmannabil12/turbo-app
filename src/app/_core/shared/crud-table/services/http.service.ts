import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ActionParam } from 'src/app/shared/model/api/actionParam';
// import { Urls } from 'src/app/shared/model/api/urls';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class HttpService {
  // incase the url need to call from json file in asset folder
  // protected domain = AppConfig.settings.apiServer;
  private domain = environment.apiUrl;
  constructor(public http: HttpClient) {
    // this.url = new Urls();
  }

  get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(`${this.domain}/${url}`);
  }

  getById<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.domain}/${url}`);
  }

  post<T>(url: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.domain}/${url}`, item);
  }

  put<T>(url: string, item: any): Observable<T> {
    return this.http.put<T>(`${this.domain}/${url}`, item);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.domain}/${url}`);
  }

  public uploadFile(uploadURL: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.domain}/${uploadURL}`, formData, { reportProgress: true, observe: 'events' });
  }

  getDomainUrl(): string {
    return this.domain;
  }
}

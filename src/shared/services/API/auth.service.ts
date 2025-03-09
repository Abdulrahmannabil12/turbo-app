import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '../LocalStorage/session.service';
import { HttpService } from './Base/http.service';
import jwt_decode from 'jwt-decode';
import { ObjectHasValue } from 'src/shared/helper/helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpService {
  private isLoggedSource = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.isLoggedSource.asObservable();

  private loginUrl = '';
  private registerUrl = '';
  urls = [
    'profile',
    'driver',
  ];

  constructor(http: HttpClient, private sessionService: SessionService) {
    super(http);
    this.changeLoginValue();
  }


  public isLogin(): boolean {
    const token = this.sessionService.getToken();
    if (token) {
      return this.validToken(token);
    }

    return false;
  }

  public changeLoginValue(): void {
    const isLogin = this.isLogin();
    this.isLoggedSource.next(isLogin);
  }

 

  public isAuthenticatedUrl(fullurl: string): boolean {
    return this.urls.some((method) => fullurl.indexOf(method) > -1);
  }

  private validToken(token: string): boolean {
    const obj = jwt_decode(token);
    return ObjectHasValue(obj);
  }
}

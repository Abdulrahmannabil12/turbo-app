import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjectHasValue } from 'src/shared/helper/helper';
import { HttpService } from 'src/shared/services/API/Base/http.service';
import { SessionService } from 'src/shared/services/LocalStorage/session.service';

@Injectable({
  providedIn: 'root',
})
export class BaseAuthService extends HttpService {
  private isLoggedSource = new BehaviorSubject<boolean>(false);
  currentUserSubject = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.isLoggedSource.asObservable();

  private loginUrl = `${environment.apiUrl}/Account/login`;
  private resetPasswordUrl = `${environment.apiUrl}/Account/resetPassword`;
  urls = [
    'profile',
    'driver',
    'vehicle',
    'associate',
    'company',
    'region',
    'order',
    // 'checkout',
  ];
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(http: HttpClient, private sessionService: SessionService) {
    super(http);
    this.changeLoginValue();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  public LoginUser(
    userName: string,
    Password: string
  ): Observable<{
    data: {
      userName: string;
      Password: string;
      mobileNo: string;
      email: string;
      token: string;
    };
  }> {
    this.isLoadingSubject.next(true);
    return this.http.post<{
      data: {
        userName: string;
        mobileNo: string;
        email: string;
        token: string;
        Password: string;
      };
    }>(this.loginUrl, { userName, Password }, {
      headers: new HttpHeaders({
        client: 'web'
      })
    });
  }
  public onLoginSuccess(loginSuccessResult: {
    data: {
      userName: string;
      mobileNo: string;
      email: string;
      token: string;
      Password: string;
    };
  }): void {
    this.isLoadingSubject.next(true);
    this.sessionService.setToken(loginSuccessResult.data.token);
    this.sessionService.setUserName(loginSuccessResult.data.userName);
  }

  getUserData(): any {
    const token = this.sessionService.getToken();
    return (token) ? jwt_decode(this.sessionService.getToken()) : null;
  }

  public isLogin(): boolean {
    return this.validToken();
  }
  public resetPassword(
    adminUserName: string,
    adminPassword: string,
    userId: string,
    newPassword: string
  ): Observable<boolean> {
    return this.http.post<boolean>(this.resetPasswordUrl, {
      adminUserName,
      adminPassword,
      userId,
      newPassword,
    });
  }
  public changeLoginValue(): void {
    const isLogin = this.isLogin();
    this.isLoggedSource.next(isLogin);
  }

 

  public isAuthenticatedUrl(fullurl: string): boolean {
    // return true;
    return this.urls.some(
      (method) => fullurl.toLowerCase().indexOf(method.toLowerCase()) > -1
    );
  }

  private validToken(): boolean {
    return ObjectHasValue(this.getUserData());
  }
}

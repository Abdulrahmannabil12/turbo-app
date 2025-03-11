import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ComponentFactoryResolver, Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { ArrayIsNotEmpty, ObjectHasValue } from "src/shared/helper/helper";
import { HttpService } from "src/shared/services/API/Base/http.service";
import { SessionService } from "src/shared/services/LocalStorage/session.service";
import { AuthModel } from "../models/auth.model";
import { catchError, finalize, map, switchMap } from "rxjs/operators";
import { AuthHTTPService } from "./auth-http";
import { UserTypes } from "src/shared/enums/UserTypes.enum";
import { ResponseData } from "src/app/_core/shared/crud-table/models/response-data.model";
import { RegisterResponseModel } from "../models/register-response.model";
import { Router } from "@angular/router";
import { NotificationService } from "src/shared/services/notification/notification.service";
import { UserInfoModel } from 'src/app/_core/partials/content/chat-inner/dataExample';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: "root",
})
export class BaseAuthService extends HttpService {
  private isLoggedSource = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.isLoggedSource.asObservable();
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  private loginUrl = `${environment.apiUrl}Account/login`;
  private resetPasswordUrl = `${environment.apiUrl}Account/ResetPassword`;
  urls = ["Account", "Suppliers"];
  isLoadingSubject: BehaviorSubject<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  currentUser$: Observable<any>;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  public loginStatusSrc = new BehaviorSubject<boolean>(false);
  public stopTimerSrc = new Subject<any>();
  public loginStatus$ = this.loginStatusSrc.asObservable();
  public stopTimer$ = this.stopTimerSrc.asObservable();
  public uData = signal("");

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }
  set currentUserValue(user: any) {
    this.uData.set(user)
    this.currentUserSubject.next(user);
  }
  constructor(
    http: HttpClient,
    private router: Router,
    private sessionService: SessionService,
    private authHttpService: AuthHTTPService,
    private notify: NotificationService
  ) {
    super(http);
    this.changeLoginValue();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.changeLoginValue();
    this.currentUserSubject = new BehaviorSubject<UserModel|any>(sessionService.getUserData());
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.uData.set(sessionService.getUserData())

  }
  isAdmin(): boolean {
    console.log(JSON.parse(this.uData()).userType)
    return JSON.parse(this.uData()).userType === UserTypes.PSP_ADMIN;
  }
  isDoctor(): boolean {
    return this.currentUserValue.userType === UserTypes.DOCTOR;
  }
  isPatient(): boolean {
    return this.currentUserValue.userType === UserTypes.PATIENT;
  }
  isSupplier(): boolean {
    const usersData =
      this.currentUserValue.usersDetails
    return (
      this.currentUserValue.userType === UserTypes.SUPPLIER &&
      usersData &&
      usersData.supplierId
    );
  }
  isPharmacy(): boolean {
    const usersData =
      this.currentUserValue.usersDetails
    return (
      this.currentUserValue.userType === UserTypes.PHARMACY &&
      usersData &&
      usersData.pharmacyId
    );
  }
  isPharmacyManager(): boolean {
    const usersData =
      this.currentUserValue.usersDetails

    return (
      this.currentUserValue.userType === UserTypes.PHARMACY &&
      usersData &&
      usersData.pharmacyId &&
      !usersData.pharmacyBranchId
    );
  }
  isPharmacyUser(): boolean {
    const usersData =
      this.currentUserValue.usersDetails

    return (
      this.currentUserValue.userType === UserTypes.PHARMACY &&
      usersData &&
      usersData.pharmacyId &&
      usersData.pharmacyBranchId
    );
  }
  public LoginUser(
    userName: string,
    password: string
  ): Observable<ResponseData<RegisterResponseModel>> {
    this.sessionService.setUserName(userName);
    this.isLoadingSubject.next(true);
    return this.http
      .post<{
        userName: string;
        mobileNo: string;
        email: string;
        profileImagePath: string;
        token: string;
        password: string;
        userType:string
      }>(
        this.loginUrl,
        { userName, password },
        {
          headers: new HttpHeaders({
            client: "web",
          }),
        }
      )
      .pipe(
        map((res: any) => {
          const auth = res["data"];
          const result = this.setAuthFromLocalStorage(auth);

          if (result) {
            return result;
          }
          return false;
        }),
        switchMap(() => this.getUserByToken()),
        catchError((err) => {
          console.error("err", err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }
  // private methods
  private setAuthFromLocalStorage(data: any): boolean {
    // store auth token/refreshToken/epiresIn in local storage to keep user logged in between page refreshes

    if (data && data.token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(data));
      this.isLoadingSubject.next(true);
      this.sessionService.setToken(data.token);
      this.sessionService.setProfileImage(data.profileImagePath);
      this.sessionService.setUserName(data.userName);
      this.sessionService.setUserId(data.userId);
      this.sessionService.setUserType(data.userType);

      return true;
    }
    return false;
  }

  registration(
    user: any
  ): Observable<ResponseData<RegisterResponseModel> | undefined> {
    this.isLoadingSubject.next(true);
    console.log(user);
    return this.authHttpService.createUser(user).pipe(
      switchMap((res) => {
        console.log(res);
        if (res.errors!.length > 0) {
          res.errors?.forEach((er:any) => this.notify.showError(er, ""));
          return of(undefined)
        }else{
      return this.LoginUser(user.get("UserName"), user.get("Password"));
        }
      }),
      catchError((_err) => {
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getUserData(): any {
    const token = this.sessionService.getToken();
    return token ? jwtDecode(this.sessionService.getToken()) : null;
  }

  public isLogin(): boolean {
    return this.validToken();
  }
  public forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.http
      .post<any>(this.resetPasswordUrl, {
        email: email,
        deviceId: "1a0c880103f49a7e",
        deviceType: "web",
      })
      .pipe(
        finalize(() => {
          this.isLoadingSubject.next(false);
        })
      );
  }
  public changeLoginValue(): void {
    const isLogin = this.isLogin();
    this.isLoggedSource.next(isLogin);
  }

  public logOut(): void {
    this.sessionService.clearAll();
    this.isLoggedSource.next(false);
    this.currentUserSubject.next(false);
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
  authurizeUser(): Observable<boolean> {
    // return this.authHttpService.auhturize(this.sessionService.getToken());
    return of(true)
  }
  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    this.sessionService.setUserData(auth);

    return this.authHttpService.auhturize(auth.authToken).pipe(
      map((user: any) => {
        if (!user) {
          this.logOut();
          return of(undefined);
        } else {
          this.currentUserSubject.next(auth);
          return user;
        }
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);

      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

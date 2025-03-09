import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification/notification.service';
import { Router } from '@angular/router';
import { BaseAuthService } from 'src/app/modules/auth/services/base.auth.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private notify: NotificationService, private router: Router, private auth: BaseAuthService
  ) {
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {


        if (error instanceof HttpErrorResponse && error.status === 401) {

          this.handle401Error();
          return EMPTY;
        }
        else if ([500, 404].includes(error.status)) {
          //  this.router.navigate(['./error/500']);
          this.notify.showError(this.getErrorMessage(error), '');
          return EMPTY;

        }
        else {
 
          if (error.error &&!error.error.error) {
            this.notify.showError('Something went wrong', '');
            return EMPTY;

          }
          Object.entries(error.error.errors).forEach((err: Array<any>) => {
            const [title, errors] = err;
            errors.forEach((childErr: string) => {
              this.notify.showError(childErr, title);

            })
          })
          return EMPTY;

        }
      })
    );
  }

  private handle401Error(): void {
    if (this.router.routerState.snapshot.url.toLowerCase().indexOf('login') === -1) {
   
      this.router.navigate(['auth/login'], {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      });
    } else {
      this.notify.showError('invalid user name or password', '');
    }
  }
  private getErrorMessage(error: HttpErrorResponse): string {
    try {
      return error.statusText;

    } catch {
      return 'General Error';
    }
  }
}

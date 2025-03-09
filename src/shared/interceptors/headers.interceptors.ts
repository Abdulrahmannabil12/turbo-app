import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseAuthService } from "src/app/modules/auth/services/base.auth.service";
import { SessionService } from "../services/LocalStorage/session.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private authService: BaseAuthService
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.clone();

    if (req.method == "OPTIONS") {
      req.headers.set("Content-Type", "application/json");
      return next.handle(req);
    }

    if (this.authService.isAuthenticatedUrl(req.url)) {
      if (req.body instanceof FormData) {
        const authReq = req.clone({
          headers: req.headers.set("enctype", "multipart/form-data"),
        });
        return next.handle(authReq);
      }
      const authReq = req.clone({
        headers: req.headers
          .set("Authorization", `Bearer ${this.sessionService.getToken()}`)
          .set("Content-Type", "application/json"),
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

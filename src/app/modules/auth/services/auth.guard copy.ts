import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { BaseAuthService } from './base.auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private authService: BaseAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,   state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    console.log(currentUser)

     if (currentUser) {
      // logged in so return true
      return true;
    }
    this.authService.logOut();
    this.router.navigate(['auth/login'], {
      queryParams: { returnUrl: state?.url||'/' },
    });
    // not logged in so redirect to login page with the return url

    return false;
  }
}

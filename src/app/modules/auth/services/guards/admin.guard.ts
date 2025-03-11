import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { BaseAuthService } from '../base.auth.service';
import { UserTypes } from 'src/shared/enums/UserTypes.enum';


@Injectable({ providedIn: 'root' })
export class AdminGuard  {
  constructor(private authService: BaseAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.userType === UserTypes.PSP_ADMIN) {
      // logged in so return true
      return true;
    }

    this.authService.logOut();
    this.router.navigate(['auth/login'], {
      queryParams: { },
    });
    return false;

  }
}


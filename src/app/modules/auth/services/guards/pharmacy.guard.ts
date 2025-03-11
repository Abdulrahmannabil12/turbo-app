import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { BaseAuthService } from '../base.auth.service';
import { UserTypes } from 'src/shared/enums/UserTypes.enum';


@Injectable({ providedIn: 'root' })
export class PharmacyGuard implements CanActivate {
  constructor(private authService: BaseAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    const usersData = currentUser.usersDetails && currentUser.usersDetails[0];
    if (currentUser &&
      currentUser.userType === UserTypes.PHARMACY &&
      usersData &&
      usersData.pharmacyId
    ) {
      // logged in so return true
      return true;
    }

    this.authService.logOut();
    this.router.navigate(['auth/login'], {
      queryParams: {},
    });
    return false;

  }
}


export interface MenuItem {
  pathName?: string;
  heading?: boolean;
  title: string;
  translateKey: string;
  iconUrl?: string;
  children?: MenuItem[];
  isAuthorized?: boolean
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAuthService } from '../modules/auth/services/base.auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  public MenuItems: MenuItem[] = [];
  constructor(private authService: BaseAuthService) {
    this.MenuItems = [
      {
        isAuthorized: this.authService.isAdmin(),
        pathName: "/admin/dashboard",
        heading: false,
        title: "Dashboard",
        translateKey: "MENU.DASHBOARD",
        iconUrl: "./assets/media/svg/icons/General/Bookmark.svg",

      },
      {
        isAuthorized: this.authService.isAdmin(),
        pathName: "/admin/accounts",
        heading: true,
        title: "SETTING",
        translateKey: "MENU.SETTING",
        iconUrl: "./assets/media/svg/icons/General/Settings-1.svg",
        children: [
                    {
            pathName: "/admin/users",
            isAuthorized: this.authService.isAdmin(),
            translateKey: "MENU.USERS",
            title: "Profile",
          },

          {
            pathName: "/admin/users/setting",
            isAuthorized: this.authService.isAdmin(),
            translateKey: "MENU.SETTING",
            title: "Profile",
          },

        ],
      },


    ];
  }




}


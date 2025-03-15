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
  public AdminMenuItems: MenuItem[] = [];
  public ClientMenuItems: MenuItem[] = [];

  constructor(private authService: BaseAuthService) {
    this.AdminMenuItems = [
      {
        isAuthorized: this.authService.isAdmin(),
        pathName: "/",
        heading: false,
        title: "Home",
        translateKey: "MENU.HOME",
        iconUrl: "./assets/media/svg/icons/General/Home.svg",

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
            isAuthorized: this.authService.isAdmin(),
            pathName: "/admin/dashboard",
            heading: false,
            title: "Dashboard",
            translateKey: "MENU.DASHBOARD",
            iconUrl: "./assets/media/svg/icons/General/Bookmark.svg",

          },

          {
            pathName: "/admin/users/setting",
            isAuthorized: this.authService.isAdmin(),
            translateKey: "MENU.USERS",
            title: "Profile",
            children: [
              {
                pathName: "/admin/users",
                isAuthorized: this.authService.isAdmin(),
                translateKey: "MENU.SETTING",
                title: "Profile",
              },

              {
                pathName: "/admin/users/setting",
                isAuthorized: this.authService.isAdmin(),
                translateKey: "MENU.PROFILE",
                title: "Profile",
              },

            ],
          },

        ],
      },


    ];
    this.ClientMenuItems = [
      {
        isAuthorized: this.authService.isAdmin(),
        pathName: "/admin/",
        heading: false,
        title: "Dashboard",
        translateKey: "MENU.DASHBOARD",
        iconUrl: "./assets/media/svg/icons/General/User.svg",

      },



    ];

  }




}


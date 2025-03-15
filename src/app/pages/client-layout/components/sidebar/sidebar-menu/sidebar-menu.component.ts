import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemsService } from 'src/app/pages/menuItems.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  menuItemsList: MenuItem[] = []
  constructor(public menuItemsService: MenuItemsService) { }

  ngOnInit(): void {
    this.menuItemsList = this.menuItemsService.ClientMenuItems
  }
  getTranslateKey(keyName: String) {

  }
}

import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { AppMenuItem } from '../../models/app-menu-item.model';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ MenuModule ],
  templateUrl: './app-menu.component.html',
})
export class AppMenuComponent {
    items: MenuItem[];

    mapMenuItem(item: AppMenuItem): MenuItem {
        return {
            label: item.name,
            icon: item.icon,
            routerLink: item.url,
            items: item.childs?.map(x => this.mapMenuItem(x)) || []
        }
    }

    constructor(private menuService: MenuService) {
        let appItems = menuService.getMenu();
        this.items = appItems.map(x => this.mapMenuItem(x));

        console.log(this.items);
    }

}

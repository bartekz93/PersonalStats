import { Injectable } from '@angular/core';
import { AppMenuItem } from '../models/app-menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(): AppMenuItem[] {
    return [
        {
            id: 2,
            name: 'Budget',
            url: '#',
            icon: 'pi pi-sun',
            childs: [
                {
                    id: 3,
                    name: 'Transactions',
                    url: 'budget/transactions',
                    icon: 'pi pi-wallet',
                },
                {
                    id: 4,
                    name: 'Categories',
                    url: 'budget/categories',
                    icon: 'pi pi-box',
                },
            ]
        },
    ]
  }
}

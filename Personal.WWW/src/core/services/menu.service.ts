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
            id: 1,
            name: 'Główne',
            url: 'main/dashboard',
            icon: 'pi pi-wallet',
            color: 'blue',
            childs: [
                {
                    id: 2,
                    name: 'Dashboard',
                    url: 'main/dashboard',
                    icon: 'pi pi-chart-line',
                },
                {
                    id: 6,
                    name: 'Raporty',
                    url: 'main/reports',
                    icon: 'pi pi-gauge',
                },
            ]
        },
        {
            id: 2,
            name: 'Budżet',
            url: '#',
            icon: 'pi pi-sun',
            color: 'blue',
            childs: [
                {
                    id: 3,
                    name: 'Portfele',
                    url: 'budget/wallets',
                    icon: 'pi pi-wallet',
                },
                {
                    id: 4,
                    name: 'Transakcje',
                    url: 'budget/transactions',
                    icon: 'pi pi-money-bill',
                },
                {
                    id: 5,
                    name: 'Kategorie',
                    url: 'budget/categories',
                    icon: 'pi pi-box',
                },
            ]
        },
        {
            id: 7,
            name: 'Dieta',
            color: 'blue',
            url: '#',
            icon: 'pi pi-shopping-bag',
            childs: [
                {
                    id: 8,
                    name: 'Jedzenie',
                    url: 'diet/food',
                    icon: 'pi pi-palette',
                },
                {
                    id: 9,
                    name: 'Posiłki',
                    url: 'diet/meals',
                    icon: 'pi pi-filter',
                },
            ]
        },
        {
            id: 11,
            name: 'Nawyki',
            color: 'blue',
            url: '#',
            icon: 'pi pi-flag',
            childs: [
                {
                    id: 12,
                    name: 'Nastrój',
                    url: 'habits/mood',
                    icon: 'pi pi-face-smile',
                },
                {
                    id: 13,
                    name: 'Tracker',
                    url: 'habits/tracker',
                    icon: 'pi pi-star',
                },
            ]
        },
        {
            id: 15,
            name: 'Czas',
            color: 'blue',
            url: '#',
            icon: 'pi pi-clock',
            childs: [
                {
                    id: 16,
                    name: 'Aktywności',
                    url: 'time/activities',
                    icon: 'pi pi-objects-column',
                },
                {
                    id: 17,
                    name: 'Kalendarz',
                    url: 'time/calendar',
                    icon: 'pi pi-calendar',
                },
            ]
        },
        {
            id: 19,
            name: 'Inne',
            color: 'blue',
            url: '#',
            icon: 'pi pi-wrench',
            childs: [
                {
                    id: 16,
                    name: 'Ustawienia',
                    url: 'other/settings',
                    icon: 'pi pi-wrench',
                }
            ]
        },
    ]
  }
}

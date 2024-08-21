import { Routes } from '@angular/router';
import BudgetModule from '../modules/budget/budget.module'
import TimeModule from '../modules/time/time.module'
import UserRoutes from '../modules/user/routes'
import MainModule from '../modules/main/main.module'
import DietModule from '../modules/diet/diet.module'

export const routes: Routes = [
    ...BudgetModule.routes,
    ...TimeModule.routes,
    ...MainModule.routes,
    ...DietModule.routes,
    ...UserRoutes

];

import { Routes } from '@angular/router';
import BudgetModule from '../modules/budget/budget.module'
import TimeModule from '../modules/time/time.module'
import UserRoutes from '../modules/user/routes'

export const routes: Routes = [
    ...BudgetModule.routes,
    ...TimeModule.routes,
    ...UserRoutes

];

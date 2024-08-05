import { Routes } from '@angular/router';
import BudgetRoutes from '../modules/budget/routes'
import UserRoutes from '../modules/user/routes'

export const routes: Routes = [
    ...BudgetRoutes,
    ...UserRoutes

];

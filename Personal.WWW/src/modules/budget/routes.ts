import { Routes } from "@angular/router";
import { TransactionsPage } from "./pages/transactions.component";
import { CategoriesPage } from "./pages/categories.component";
import { AuthGuard } from "../../core/guards/auth.guard";

const modulePrefix = 'budget';

const routes: Routes = [
    { path: `${modulePrefix}/transactions`, component: TransactionsPage, canActivate: [AuthGuard] },
    { path: `${modulePrefix}/categories`, component: CategoriesPage, canActivate: [AuthGuard] },
];

export default routes;

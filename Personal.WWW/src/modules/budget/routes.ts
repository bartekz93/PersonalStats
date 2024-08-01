import { Routes } from "@angular/router";
import { TransactionsPage } from "./pages/transactions.component";
import { CategoriesPage } from "./pages/categories.component";

const modulePrefix = 'budget';

const routes: Routes = [
    { path: `${modulePrefix}/transactions`, component: TransactionsPage },
    { path: `${modulePrefix}/categories`, component: CategoriesPage },
];

export default routes;

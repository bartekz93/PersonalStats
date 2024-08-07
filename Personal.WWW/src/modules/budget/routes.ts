import { Routes } from "@angular/router";
import { TransactionsPage } from "./pages/transactions.component";
import { CategoriesPage } from "./pages/categories.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { WalletsPage } from "./pages/wallets/wallets.component";

const modulePrefix = 'budget';

const routes: Routes = [
    { path: `${modulePrefix}/wallets`, component: WalletsPage, canActivate: [AuthGuard] },
    { path: `${modulePrefix}/transactions`, component: TransactionsPage, canActivate: [AuthGuard] },
    { path: `${modulePrefix}/categories`, component: CategoriesPage, canActivate: [AuthGuard] },
];

export default routes;

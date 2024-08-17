import { Routes } from "@angular/router";
import { TransactionsPage } from "./pages/transactions/transactions.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { WalletsPage } from "./pages/wallets/wallets.component";
import { CategoriesPage } from "./pages/categories/categories.component";

const modulePrefix = 'budget';

export default {
    routes: [
        { path: `${modulePrefix}/wallets`, component: WalletsPage, canActivate: [AuthGuard] },
        { path: `${modulePrefix}/transactions`, component: TransactionsPage, canActivate: [AuthGuard] },
        { path: `${modulePrefix}/categories`, component: CategoriesPage, canActivate: [AuthGuard] },
    ] as Routes,
    dialogs: {
        WalletEditDialog: 'WalletEditDialog',
        CategoryEditDialog: 'WalletEditDialog',
        TransactionEditDialog: 'TransactionEditDialog'
    },
    lists: {
        WalletsList: 'WalletsList',
        CategoriesList: 'CategoriesList',
        TransactionsList: 'TransactionsList',
    }
}
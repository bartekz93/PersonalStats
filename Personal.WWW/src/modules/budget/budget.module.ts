import { Routes } from "@angular/router";
import { TransactionsPage } from "./pages/transactions/transactions.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { WalletsPage } from "./pages/wallets/wallets.component";
import { CategoriesPage } from "./pages/categories/categories.component";
import { AppDashboardService } from "@core/services/app-dashboard.service";
import { IncomePieChartTile } from "./components/income-pie-chart-tile/income-pie-chart-tile.component";

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
    },
    init: (dashboardService: AppDashboardService) => {
        dashboardService.register({
            component: IncomePieChartTile,
            icon: 'pi pi-chart-pie',
            strongName: 'outcome-distribution-tile',
            title: 'budget.outcomeDistribution'
        })
        dashboardService.register({
            component: IncomePieChartTile,
            icon: 'pi pi-chart-pie',
            strongName: 'income-distribution-tile',
            title: 'budget.incomeDistribution'
        })
    }
}
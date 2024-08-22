import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { MealsComponent } from "./pages/meals/meals.component";
import { FoodComponent } from "./pages/food/food.component";
import { AppDashboardService } from "@core/services/app-dashboard.service";
import { MealsDistributionTile } from "./components/meals-distribution-tile/meals-distribution-tile.component";

const modulePrefix = 'diet';

export default {
    routes: [
        { path: `${modulePrefix}/food`, component: FoodComponent, canActivate: [AuthGuard] },
        { path: `${modulePrefix}/meals`, component: MealsComponent, canActivate: [AuthGuard] }
    ] as Routes,
    dialogs: {
        FoodEditDialog: 'time.foodEditDialog',
        MealEditDialog: 'time.mealEditDialog'
    },
    lists: {
        FoodList: 'time.foodList'
    },

    init: (dashboardService: AppDashboardService) => {
        dashboardService.register({
            component: MealsDistributionTile,
            icon: 'pi pi-chart-pie',
            strongName: 'meals-distribution-tile',
            title: 'diet.mealsDistribution'
        })
    }
}
import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { DashboardPage } from "./pages/dashboard.component";

const modulePrefix = 'main';

export default {
    routes: [
        { path: `${modulePrefix}/dashboard`, component: DashboardPage, canActivate: [AuthGuard] }
    ] as Routes,
    dialogs: {
        
    },
    lists: {
        
    }
}
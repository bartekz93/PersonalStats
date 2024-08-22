import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { CalendarPage } from "./pages/calendar/calendar.component";
import { TimeActivitiesPage } from "./pages/activities/time-activities.component";
import { ActivityPieChartTile } from "./components/activity-pie-chart-tile/activity-pie-chart-tile.component";
import { AppDashboardService } from "@core/services/app-dashboard.service";
import { ActivityBarChartTile } from "./components/activity-bar-chart-tile/activity-bar-chart-tile.component";

const modulePrefix = 'time';

export default {
    routes: [
        { path: `${modulePrefix}/activities`, component: TimeActivitiesPage, canActivate: [AuthGuard] },
        { path: `${modulePrefix}/calendar`, component: CalendarPage, canActivate: [AuthGuard] }
    ] as Routes,
    dialogs: {
        ActivityEditDialog: 'time.activityEditDialog',
        EntryEditDialog: 'time.entryEditDialog'
    },
    lists: {
        ActivitiesList: 'time.activitiesList'
    },
    init: (dashboardService: AppDashboardService) => {
        dashboardService.register({
            component: ActivityPieChartTile,
            icon: 'pi pi-chart-pie',
            strongName: 'activity-pie-chart-tile',
            title: 'time.activityPieChart'
        })
        dashboardService.register({
            component: ActivityBarChartTile,
            icon: 'pi pi-chart-bar',
            strongName: 'activity-bar-chart-tile',
            title: 'time.activityBarChart'
        })
    }
}
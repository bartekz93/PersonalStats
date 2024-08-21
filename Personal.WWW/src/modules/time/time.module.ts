import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { CalendarPage } from "./pages/calendar/calendar.component";
import { TimeActivitiesPage } from "./pages/activities/time-activities.component";

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
    }
}
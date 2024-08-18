import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { CalendarPage } from "./pages/calendar/calendar.component";

const modulePrefix = 'time';

export default {
    routes: [
        { path: `${modulePrefix}/calendar`, component: CalendarPage, canActivate: [AuthGuard] }
    ] as Routes,
    dialogs: {
        
    },
    lists: {
        
    }
}
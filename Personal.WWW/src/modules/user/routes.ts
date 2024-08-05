import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login-page.component";

const modulePrefix = 'user';

const routes: Routes = [
    { path: `${modulePrefix}/login`, component: LoginPage },
];

export default routes;

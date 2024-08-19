import { Component, OnInit } from '@angular/core';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppDashboardComponent } from '@core/components/app-dashboard/app-dashboard.component';
import { AppPage } from '@core/components/app-page/app-page.component';

@Component({
    standalone: true,
    imports: [AppDashboardComponent, AppPage, AppButtonComponent],
    selector: 'main-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardPage implements OnInit {
    constructor() { }

    edit = true

    ngOnInit() { }
}
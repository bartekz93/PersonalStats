import { Component, OnInit } from '@angular/core';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppDashboardComponent } from '@core/components/app-dashboard/app-dashboard.component';
import { AppIntervalComponent, AppIntervalDates } from '@core/components/app-interval/app-interval.component';
import { AppPage } from '@core/components/app-page/app-page.component';
import { AppDashboardService } from '@core/services/app-dashboard.service';

@Component({
    standalone: true,
    imports: [AppDashboardComponent, AppPage, AppButtonComponent, AppIntervalComponent],
    selector: 'main-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardPage implements OnInit {
    constructor(private dashboardService: AppDashboardService) { }

    edit = true

    ngOnInit() { }

    onSelectDates(dates: AppIntervalDates) {
        this.dashboardService.setParams({
            dateFrom: dates.dateFrom,
            dateTo: dates.dateTo
        })
    }
}
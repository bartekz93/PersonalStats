import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@budget/services/transactions.service';
import { AppDashboardTileBase } from '@core/components/app-dashboard/app-dashboard-tile.base';
import { AppCalendarService } from '@core/services/app-calendar.service';
import { AppDashboardParams, AppDashboardService } from '@core/services/app-dashboard.service';
import { ChartData } from 'chart.js';
import _ from 'lodash';
import { EntryService } from 'modules/time/services/entry.service';
import { ChartModule } from 'primeng/chart';

@Component({
    standalone: true,
    imports: [ CommonModule, ChartModule ],
    selector: 'activity-pie-chart-tile',
    template: '<p-chart width="100%" height="100%"  type="pie" [data]="data" />'
})

export class ActivityPieChartTile extends AppDashboardTileBase {
    constructor(dashboardService: AppDashboardService, private entryService: EntryService, private calendarService: AppCalendarService) { 
        super(dashboardService);
    }

    data?: ChartData;

    async onUpdate(p: AppDashboardParams) {
        let result = await this.entryService.search({
            dateFrom: p.dateFrom.toJSON().substring(0, 10),
            dateTo: p.dateTo.toJSON().substring(0, 10)
        })

        let grouped = _.groupBy(result.rows, x => x.activityId);

        let tmpData = Object.keys(grouped).map(x => ({
            label: grouped[x][0].activityName,
            sum: grouped[x].map(y => this.calendarService.minutesDiff(new Date(y.dateFrom), new Date(y.dateTo))).reduce((p, a) => p+a, 0),
            color: grouped[x][0].activityColor,
        }))

        this.data = {
            labels: tmpData.map(x => x.label),
            datasets: [
                {
                    data: tmpData.map(x => x.sum),
                    backgroundColor: tmpData.map(x => x.color)
                }
            ]
        };
    }

    ngOnInit(): void {
        this.init();
    }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@budget/services/transactions.service';
import { AppDashboardTileBase } from '@core/components/app-dashboard/app-dashboard-tile.base';
import { Format } from '@core/helpers/formatters';
import { AppCalendarService } from '@core/services/app-calendar.service';
import { AppDashboardParams, AppDashboardService } from '@core/services/app-dashboard.service';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import _ from 'lodash';
import { EntryService } from 'modules/time/services/entry.service';
import { ChartModule } from 'primeng/chart';

@Component({
    standalone: true,
    imports: [ CommonModule, ChartModule ],
    selector: 'activity-bar-chart-tile',
    template: '<p-chart width="100%" height="100%" type="bar" [data]="data" [options]="options" />'
})

export class ActivityBarChartTile extends AppDashboardTileBase {
    constructor(dashboardService: AppDashboardService, private entryService: EntryService, private calendarService: AppCalendarService) { 
        super(dashboardService);
    }

    data?: ChartData;
    options?: ChartOptions;

    async onUpdate(p: AppDashboardParams) {
        let result = await this.entryService.search({
            dateFrom: p.dateFrom.toJSON().substring(0, 10),
            dateTo: p.dateTo.toJSON().substring(0, 10)
        })

        let labels = this.calendarService.getDaysBetween(p.dateFrom, p.dateTo).map(x => Format.date(x));

        let activities = _.uniqBy(result.rows, x => x.activityId).map(x => ({
            id: x.activityId,
            name: x.activityName,
            color: x.activityColor
        }))

        this.data = {
            labels: labels,
            datasets: activities.map(a => ({
                type: 'bar',
                label: a.name,
                backgroundColor: a.color,
                data: labels.map(x => result.rows
                    .filter(r => Format.date(r.dateFrom) == x && r.activityId == a.id)
                    .map(r => this.calendarService.minutesDiff(new Date(r.dateFrom), new Date(r.dateTo)))
                    .reduce((p, a) => p+a, 0)
                )
            } as ChartDataset
        ))}

        this.options = {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        };
    }

    ngOnInit(): void {
        this.init();
    }
}
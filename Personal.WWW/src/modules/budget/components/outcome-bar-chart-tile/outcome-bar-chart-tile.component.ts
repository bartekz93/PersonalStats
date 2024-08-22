import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@budget/services/transactions.service';
import { AppDashboardTileBase } from '@core/components/app-dashboard/app-dashboard-tile.base';
import { Format } from '@core/helpers/formatters';
import { AppCalendarService } from '@core/services/app-calendar.service';
import { AppDashboardParams, AppDashboardService } from '@core/services/app-dashboard.service';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import _ from 'lodash';
import { ChartModule } from 'primeng/chart';

@Component({
    standalone: true,
    imports: [ CommonModule, ChartModule ],
    selector: 'outcome-bar-chart-tile',
    template: '<p-chart width="100%" height="100%" type="bar" [data]="data" [options]="options" />'
})

export class OutcomeBarChartTile extends AppDashboardTileBase {
    constructor(dashboardService: AppDashboardService, private transactionService: TransactionService, private calendarService: AppCalendarService) { 
        super(dashboardService);
    }

    data?: ChartData;
    options?: ChartOptions;

    async onUpdate(p: AppDashboardParams) {
        let result = await this.transactionService.search({
            dateFrom: p.dateFrom.toJSON().substring(0, 10),
            dateTo: p.dateTo.toJSON().substring(0, 10),
            amountMax: 0
        })

        let labels = this.calendarService.getDaysBetween(p.dateFrom, p.dateTo).map(x => Format.date(x));

        let categories = _.uniqBy(result.rows, x => x.categoryId).map(x => ({
            id: x.categoryId,
            name: x.categoryName,
            color: x.categoryColor
        }))

        this.data = {
            labels: labels,
            datasets: categories.map(c => ({
                type: 'bar',
                label: c.name,
                backgroundColor: c.color,
                data: labels.map(x => result.rows
                    .filter(r => Format.date(r.date) == x && r.categoryId == c.id)
                    .map(r => Math.abs(r.amount))
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
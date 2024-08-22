import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@budget/services/transactions.service';
import { AppDashboardTileBase } from '@core/components/app-dashboard/app-dashboard-tile.base';
import { AppDashboardParams, AppDashboardService } from '@core/services/app-dashboard.service';
import { ChartData } from 'chart.js';
import _ from 'lodash';
import { ChartModule } from 'primeng/chart';

@Component({
    standalone: true,
    imports: [ CommonModule, ChartModule ],
    selector: 'outcome-pie-chart-tile',
    template: '<p-chart width="100%" height="100%"  type="pie" [data]="data" />'
})

export class OutcomePieChartTile extends AppDashboardTileBase {
    constructor(dashboardService: AppDashboardService, private transactionService: TransactionService) { 
        super(dashboardService);
    }

    data?: ChartData;

    async onUpdate(p: AppDashboardParams) {
        let result = await this.transactionService.search({
            dateFrom: p.dateFrom.toJSON().substring(0, 10),
            dateTo: p.dateTo.toJSON().substring(0, 10),
            amountMax: 0
        })

        let grouped = _.groupBy(result.rows, x => x.categoryId);

        let tmpData = Object.keys(grouped).map(x => ({
            label: grouped[x][0].categoryName,
            sum: grouped[x].map(y => Math.abs(y.amount)).reduce((p, a) => p+a, 0),
            color: grouped[x][0].categoryColor,
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
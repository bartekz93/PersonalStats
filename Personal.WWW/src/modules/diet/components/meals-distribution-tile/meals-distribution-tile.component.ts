import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppDashboardTileBase } from '@core/components/app-dashboard/app-dashboard-tile.base';
import { AppDashboardTileComponent } from '@core/components/app-dashboard/app-dashboard-tile.component';
import { AppDashboardParams, AppDashboardService } from '@core/services/app-dashboard.service';
import { ChartData } from 'chart.js';
import _ from 'lodash';
import { MealService } from 'modules/diet/services/meal.service';
import { ChartModule } from 'primeng/chart';

@Component({
    standalone: true,
    imports: [ AppDashboardTileComponent, CommonModule, ChartModule ],
    selector: 'meals-distribution-tile',
    template: '<p-chart type="pie" [data]="data" />'
})

export class MealsDistributionTile extends AppDashboardTileBase implements OnInit {
    constructor(dashboardService: AppDashboardService, private mealService: MealService) { 
        super(dashboardService);
    }

    data?: ChartData;

    async onUpdate(p: AppDashboardParams) {
        let result = await this.mealService.search({
            dateFrom: p.dateFrom.toJSON().substring(0, 10),
            dateTo: p.dateTo.toJSON().substring(0, 10),
        });

        let grouped = _.groupBy(result.rows, x => x.foodId)

        let tmpData = Object.keys(grouped).map(x => ({
            label: grouped[x][0].foodName,
            sum: grouped[x].map(y => y.kcal).reduce((p, a) => p+a, 0),
            color: grouped[x][0].foodColor,
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
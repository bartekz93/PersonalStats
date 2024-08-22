import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppDashboardTileBase } from '@core/components/app-dashboard/app-dashboard-tile.base';
import { AppDashboardParams, AppDashboardService } from '@core/services/app-dashboard.service';

@Component({
    standalone: true,
    imports: [ CommonModule ],
    selector: 'income-pie-chart-tile',
    styles: `
        :host {
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;
        }
    `,
    templateUrl: 'income-pie-chart-tile.component.html'
})

export class IncomePieChartTile extends AppDashboardTileBase implements OnInit {
    constructor(dashboardService: AppDashboardService) { 
        super(dashboardService);
    }

    ngOnInit(): void {
        this.init();
    }

    async onUpdate(p: AppDashboardParams) {

        
    }
}
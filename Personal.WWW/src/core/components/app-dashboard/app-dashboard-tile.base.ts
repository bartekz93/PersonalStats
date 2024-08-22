import { OnInit } from "@angular/core";
import { AppDashboardParams, AppDashboardService } from "@core/services/app-dashboard.service";

export abstract class AppDashboardTileBase {
    constructor(protected dashboardService: AppDashboardService) {
    }

    init(): void {
        let currentParams = this.dashboardService.getParams();
        console.log('ctr', currentParams)
        if (currentParams) {
            this.onUpdate(currentParams);
        }
        
        this.dashboardService.params$.subscribe(p => {
            this.onUpdate(p);
        })
    }

    abstract onUpdate(p: AppDashboardParams): void;
}
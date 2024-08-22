import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';
import { AppDashboardTileComponent } from '@core/components/app-dashboard/app-dashboard-tile.component';
import { AppDialogComponent } from '@core/components/app-dialog/app-dialog.component';
import { AppDynamicComponent } from '@core/components/app-dynamic/app-dynamic.component';
import { AppListBoxComponent } from '@core/components/app-listbox/app-listbox.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { AppDashboardService, DashboardTileDesc } from '@core/services/app-dashboard.service';
import { AppDialogOpenContext, AppDialogOpenOptions, AppDialogOpenParam, AppDialogService } from '@core/services/app-dialog.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [ 
        AppDialogComponent,
        AppButtonComponent, 
        AppListBoxComponent, 
        CommonModule, 
        AppTemplateDirective, 
        TranslateModule, 
        AppCircleLabelComponent,
        AppDashboardTileComponent,
        AppDynamicComponent
    ],
    selector: 'app-dashboard-tile-browser',
    templateUrl: 'app-dashboard-tile-browser.component.html',
    styleUrl: 'app-dashboard-tile-browser.component.scss',
})

export class AppDashboardTileBrowserComponent implements OnInit {
    constructor(private dashboardService: AppDashboardService, private translateService: TranslateService, private dialogService: AppDialogService) { }

    tiles: any[] = [];
    selected: any;
    dialogCtx?: AppDialogOpenContext;

    ngOnInit() { 
        this.tiles = this.dashboardService.all();
    }

    close() {
        this.dialogService.close('app-dashboard-tile-browser')
    }

    onOpen(param: AppDialogOpenParam) {
        this.selected = null;
        this.dialogCtx = param.ctx;
    }

    select() {
        this.dialogCtx?.resolve(this.selected);
        this.close();
    }
}
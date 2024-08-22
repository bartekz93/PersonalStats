import { Component, Input, OnInit } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppDashboardBoxComponent } from './app-dashboard-box.component';
import { AppDashboardTileBrowserComponent } from "../../dialogs/dashboard-tile-browser/app-dashborad-tile-browser.component";

export interface AppDashboardBox {
    type?: string;
    tile?: string;
    size1?: number;
    size2?: number;
    box1?: AppDashboardBox;
    box2?: AppDashboardBox;
}

@Component({
    standalone: true,
    imports: [AppButtonComponent, AppDashboardBoxComponent, AppDashboardTileBrowserComponent],
    selector: 'app-dashboard',
    templateUrl: 'app-dashboard.component.html',
    styleUrl: 'app-dashboard.component.scss',
})

export class AppDashboardComponent implements OnInit {
    constructor() { }

    @Input() edit = false;

    root: AppDashboardBox = {
        type: 'N'
    };

    ngOnInit() { }
}
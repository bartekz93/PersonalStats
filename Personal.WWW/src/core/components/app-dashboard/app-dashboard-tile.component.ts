import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardTileDesc } from '@core/services/app-dashboard.service';
import { AppCardComponent } from '../app-card/app-card.component';
import { AppButtonComponent } from '../app-button/app-button.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [AppCardComponent, AppButtonComponent, TranslateModule],
    selector: 'app-dashboard-tile',
    styles: `
        :host {
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;
            padding: 5px;
        }
        .title {
            white-space: nowrap;
        }
    `,
    templateUrl: 'app-dashboard-tile.component.html'
})

export class AppDashboardTileComponent {
    constructor(private translateService: TranslateService) { }

    @Input() tile?: DashboardTileDesc;
    @Input() edit = false;

    @Output() onRemove = new EventEmitter();
}
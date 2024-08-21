import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';
import { AppSelectComponent } from '@core/controls/app-select.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ActivityService } from '../services/activity.service';

@Component({
    standalone: true,
    imports: [ AppSelectComponent, AppCircleLabelComponent, AppTemplateDirective, TranslateModule ],
    selector: 'activity-select',
    template: `
        <app-select [options]="options" [label]="label" [fc]="fc" >
            <ng-template appTemplate="item" let-item="item">
                <app-circle-label [icon]="item.icon" [color]="item.color" [label]="item.label | translate" [size]="1"/>
            </ng-template>
        </app-select>
    `
})

export class ActivitySelectComponent implements OnInit {
    constructor(private activityService: ActivityService) {
    }

    @Input() fc!: FormControl;
    @Input() label: string = '';

    options: any[] = [];

    async ngOnInit() {
        let items = await this.activityService.search({});
        this.options = items.rows.map(x => ({
            label: x.name,
            value: x.id,
            icon: x.icon,
            color: x.color
        }))
    }
}

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';
import { AppSelectComponent } from '@core/controls/app-select.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [ AppSelectComponent, AppCircleLabelComponent, AppTemplateDirective, TranslateModule ],
    selector: 'category-type-select',
    template: `
        <app-select [options]="options" [label]="label" [fc]="fc">
            <ng-template appTemplate="item" let-item="item">
                <app-circle-label [icon]="item.icon" [color]="item.color" [label]="item.label | translate" [size]="1"/>
            </ng-template>
        </app-select>
    `
})

export class CategoryTypeSelectComponent {
    constructor() {
    }

    @Input() fc!: FormControl;
    @Input() label: string = '';

    options = [
        {
            label: 'budget.income',
            value: 'I',
            icon: 'pi pi-plus',
            color: 'green'
        },
        {
            label: 'budget.outcome',
            value: 'O',
            icon: 'pi pi-minus',
            color: 'red'
        }
    ]
}

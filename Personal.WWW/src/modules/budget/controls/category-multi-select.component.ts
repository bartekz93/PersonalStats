import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoryService } from '@budget/services/category.service';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';
import { AppMultiSelectComponent } from '@core/controls/app-multi-select.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [ AppMultiSelectComponent, AppCircleLabelComponent, AppTemplateDirective, TranslateModule ],
    selector: 'category-multi-select',
    template: `
        <app-multi-select [options]="options" [label]="label" [fc]="fc" >
            <ng-template appTemplate="item" let-item="item">
                <app-circle-label [icon]="item.icon" [color]="item.color" [label]="item.label | translate" [size]="1"/>
            </ng-template>
        </app-multi-select>
    `
})

export class CategoryMultiSelectComponent implements OnInit {
    constructor(private categoryService: CategoryService) {
    }

    @Input() fc!: FormControl;
    @Input() label: string = '';

    options: any[] = [];

    async ngOnInit() {
        let wallets = await this.categoryService.search({});
        this.options = wallets.rows.map(x => ({
            label: x.name,
            value: x.id,
            icon: x.icon,
            color: x.color
        }))
    }
}

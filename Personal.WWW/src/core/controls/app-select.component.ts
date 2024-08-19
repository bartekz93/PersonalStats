import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';
import { DropdownModule } from 'primeng/dropdown';
import { AppTemplateDirective } from '@core/directives/app-template.directive';

@Component({
    standalone: true,
    imports: [DropdownModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-select',
    template: `
        <app-base-control>
            <p-dropdown 
                [style]="{ minWidth: '100%'}"
                [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }"
                [loading]="loading" 
                [options]="options" 
                [filter]="filter"
                [ngModel]="fc?.value" 
                (ngModelChange)="update($event)" 
                [placeholder]="label | translate" 
                optionValue="value" 
                optionLabel="label" 
                [showClear]="true"
            >
                @if (hasTemplate('item')) {
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="getTemplate('item');context:{item}"></ng-container> 
                    </ng-template>
                    <ng-template let-item pTemplate="selectedItem">
                        <ng-container *ngTemplateOutlet="getTemplate('item');context:{item}"></ng-container> 
                    </ng-template>
                }
            </p-dropdown>
            <ng-content></ng-content>
        <app-base-control>`
})
export class AppSelectComponent extends AppBaseControl {
    constructor() {
        super()
    }

    @ContentChildren(AppTemplateDirective) templates?: QueryList<AppTemplateDirective>;

    @Input() filter = false;
    @Input() loading = false;
    @Input() options: any[] = [];

    hasTemplate(name: string) {
        return this.templates?.find(x => x.name == name) !== undefined;
    }

    getTemplate(name: string) {
        return this.templates?.find(x => x.name == name)?.template as TemplateRef<any>;
    }
}
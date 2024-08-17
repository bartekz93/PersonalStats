import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    standalone: true,
    imports: [MultiSelectModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-multi-select',
    styles: `
        .circle {
            display: flex;
            align-items: center;
            border-radius: 50%; 
            font-size: 10px; 
            color: white; 
            padding: 3px; 
            background-color: var(--primary-color);
        }
    `,
    template: `
        <app-base-control>
            <p-multiSelect
                [style]="{ minWidth: '100%', minHeight: '100%', flex: 1 }"
                [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }"
                [loading]="loading" 
                [options]="options" 
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
                    <ng-template let-items pTemplate="selectedItems">
                        @if (items && items.length > 0) {
                            @let first = items[0];
                            @let restCount = items.length-1;
                            <div style="display: flex; gap: 10px; overflow: hidden">
                                <ng-container *ngTemplateOutlet="getTemplate('item');context:{item: first}"></ng-container> 
                                @if (restCount > 0) {
                                    <div class="circle">+{{restCount}}</div>
                                }
                            </div>
                        } 
                        @else {
                            {{ label | translate }}
                        }
                    </ng-template>
                }
            </p-multiSelect>
            <ng-content></ng-content>
        <app-base-control>`
})
export class AppMultiSelectComponent extends AppBaseControl {
    constructor() {
        super()
    }

    @ContentChildren(AppTemplateDirective) templates?: QueryList<AppTemplateDirective>;

    @Input() loading = false;
    @Input() options: any[] = [];

    hasTemplate(name: string) {
        return this.templates?.find(x => x.name == name) !== undefined;
    }

    getTemplate(name: string) {
        return this.templates?.find(x => x.name == name)?.template as TemplateRef<any>;
    }
}
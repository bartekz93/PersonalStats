import { CommonModule } from '@angular/common';
import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { ListboxModule } from 'primeng/listbox';

@Component({
    standalone: true,
    imports: [ ListboxModule, CommonModule, FormsModule ],
    selector: 'app-listbox',
    template: `
        <p-listbox 
            [options]="items" 
            [ngModel]="selected" 
            (ngModelChange)="selectedChange.emit($event)"
            optionLabel="label"
            [listStyle]="{'min-height': '100%'}"
        >
            @if (hasTemplate('item')) {
                <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="getTemplate('item'); context: { item: item }" />
                </ng-template>
            }
        </p-listbox>
    `
})

export class AppListBoxComponent implements OnInit {
    constructor() { }

    @ContentChildren(AppTemplateDirective) templates?: QueryList<AppTemplateDirective>;

    @Input() items: any[] = [];

    @Input() selected:  any;
    @Output() selectedChange = new EventEmitter<any>()

    ngOnInit() { }

    hasTemplate(name: string) {
        return this.templates?.find(x => x.name == name) !== undefined;
    }

    getTemplate(name: string) {
        return this.templates?.find(x => x.name == name)?.template as TemplateRef<any>;
    }
}
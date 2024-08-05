import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AppDynamicComponent } from '../app-dynamic/app-dynamic.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'primeng/progressbar';

export interface AppListColumnDefinition<T> {
    name: string;
    sortable?: boolean;
    label: string;
    value?: (x: T) => string;
    component?: any;
    width?: string;
    right?: boolean;
}

@Component({
    standalone: true,
    imports: [ TableModule, AppDynamicComponent, CommonModule, TranslateModule, ProgressBarModule ],
    selector: 'app-list',
    templateUrl: 'app-list.component.html',
    styleUrl: 'app-list.component.scss'
})

export class AppList<T> implements OnInit {
    constructor() { }

    @Input() loading?: boolean;
    @Input() items!: T[];
    @Input() columns!: AppListColumnDefinition<T>[];
    @Input() sortField: string = '';
    @Input() sortOrder: number = 1;

    @Output() onLoad: EventEmitter<any> = new EventEmitter();

    totalRows = 1000;

    ngOnInit() { }

    getCellStyle(col: AppListColumnDefinition<T>, item: T) {
        return {
            width: col.width ? col.width : 'auto',
            textAlign: col.right ? 'right' : 'left'
        }
    }

    getHeaderStyle(col: AppListColumnDefinition<T>) {
        return {
            textAlign: col.right ? 'right' : 'left'
        }
    }

    load(event: any) {
        this.onLoad.emit(event);
        console.log({
            offset: event.first, 
            pageSize: event.rows,
            sortField: event.sortField,
            sortOrder: event.sortOrder
        });
    }
}
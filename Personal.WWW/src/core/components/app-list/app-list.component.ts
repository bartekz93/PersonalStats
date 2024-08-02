import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AppDynamicComponent } from '../app-dynamic/app-dynamic.component';
import { CommonModule } from '@angular/common';

export interface AppListColumnDefinition<T> {
    label: string;
    value?: (x: T) => string;
    component?: any;
    width?: string;
    right?: boolean;
}

@Component({
    standalone: true,
    imports: [ TableModule, AppDynamicComponent, CommonModule ],
    selector: 'app-list',
    templateUrl: 'app-list.component.html',
    styleUrl: 'app-list.component.scss'
})

export class AppList<T> implements OnInit {
    constructor() { }

    @Input() items!: T[];
    @Input() columns!: AppListColumnDefinition<T>[];

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
}
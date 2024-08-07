import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AppDynamicComponent } from '../app-dynamic/app-dynamic.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { SearchCriteria, SearchResult } from '../../services/base.service';

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
    
    @Input() columns!: AppListColumnDefinition<T>[];
    @Input() result!: SearchResult<T>;
    @Input() criteria!: SearchCriteria;
    @Input() defaultSort = ''
    @Input() loading = false

    @Output() onSearch: EventEmitter<any> = new EventEmitter();

    ngOnInit() { 
    }

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

    onChange(e: any) {
        let pageCriteria = {
            offset: e.first,
            rows: e.rows,
            sortField: e.sortField,
            sortOrder: e.sortOrder,
        };
        this.onSearch.emit(pageCriteria);
    }
}
import { TranslateModule } from "@ngx-translate/core";
import { AppFilterPanel, AppFilterPanelDefinition } from "../app-filter-panel/app-filter-panel.component";
import { AppList, AppListColumnDefinition } from "../app-list/app-list.component";
import { AppPage } from "../app-page/app-page.component";
import { AppAction } from "../../models/app-page-action.model";
import { Component, Input, OnInit } from "@angular/core";

export interface AppSearchPageDesc<T, F> {
    name: string;
    items?: T[];
    filter?: F;
    defaultFilter: F;
    defaultSort?: string;
    filters: AppFilterPanelDefinition<F>[];
    columns: AppListColumnDefinition<T>[];
    actions: AppAction[];
    dataProvider: (filter: F) => T[];
    immediateLoad?: boolean;
}

export abstract class AppSearchPageBase<T, F> {
    page!: AppSearchPageDesc<T, F>;

    constructor(page: AppSearchPageDesc<T, F>) {
        this.page = Object.assign({ items: [], filter: {}}, page);
    }

    abstract fetchItems(filter: F): T[];
}

@Component({
    selector: 'app-page-search',
    templateUrl: 'app-page-search.component.html',
    standalone: true,
    imports: [AppPage, AppFilterPanel, AppList, TranslateModule]
})
export class AppSearchPage<T, F> implements OnInit {
    @Input() page!: AppSearchPageDesc<T, F>;

    sortField: string = '';
    sortOrder: number = 1;

    clearFilter() {
        this.page.filter = this.page.defaultFilter;
    }

    ngOnInit(): void {
        this.page.filter = this.page.defaultFilter;

        if (this.page.defaultSort) {
            let el = this.page.defaultSort.split(' ');
            this.sortField = el[0];
            this.sortOrder = el[1] == 'ASC' ? 1 : -1;
        }

        if (this.page.immediateLoad) {
            this.page.items = this.page.dataProvider(this.page.filter);
        }
    }
}
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppListColumnDefinition } from "@core/components/app-list/app-list.component";
import { SearchCriteria, SearchResult } from "@core/services/base.service";

export abstract class AppSearchPageBase<T> {
    result!: SearchResult<T>;
    totalRows = 0;
    criteria: any = {};
    filters!: FormGroup;
    columns: AppListColumnDefinition<T>[] = [];
    loading = false;
    name = '';

    constructor(name: string) {
        this.name = name;
        this.result = {
            rows: [],
            totalRows: 0
        }
        this.criteria = {
            offset: 0,
            rows: 5,
            sortBy: '',
            sortOrder: 1
        } as SearchCriteria;

        this.prepareFiltersForm();
        this.restoreFilters();

        this.columns = this.getColumns();
    }

    protected filter(name: string) {
        return this.filters.get(name) as FormControl;
    }

    protected clear() {
        this.filters.setValue(this.getDefaultFilters());
        this.search();
    }

    protected async search(criteriaPart?: any) {
        setTimeout(async () => {
            this.loading = true;
            this.criteria = Object.assign(this.criteria, this.filters.value, criteriaPart);
            this.result = await this.getResult(this.criteria);
            this.storeFilters();
            this.loading = false;
        });
    }

    private prepareFiltersForm() {
        let controls: { [key: string]: FormControl } = {};
        let defaults = this.getDefaultFilters();
        for (let key of Object.keys(defaults)) {
            controls[key] = new FormControl(defaults[key]);
        }
        this.filters = new FormGroup(controls);
        console.log(this.filters);
    }

    private storeFilters() {
        localStorage.setItem(this.name, JSON.stringify(this.filters.value));
    }

    private restoreFilters() {
        let storedFiltersString = localStorage.getItem(this.name);
        if (storedFiltersString) {
            let storedFilters = JSON.parse(storedFiltersString);
            this.criteria = Object.assign(this.criteria, storedFilters);
            this.filters.setValue(storedFilters);
        }
    }

    protected abstract getResult(criteria: any): Promise<SearchResult<T>>;
    protected abstract getDefaultFilters(): any;
    protected abstract getColumns(): AppListColumnDefinition<T>[];
}
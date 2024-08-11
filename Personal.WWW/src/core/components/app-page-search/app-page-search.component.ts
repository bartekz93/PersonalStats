// import { TranslateModule } from "@ngx-translate/core";
// import { AppFilterPanel } from "../app-filter-panel/app-filter-panel.component";
// import { AppList, AppListColumnDefinition } from "../app-list/app-list.component";
// import { AppPage } from "../app-page/app-page.component";
// import { AppAction, AppActionContext } from "../../models/app-page-action.model";
// import { Component, Input, OnInit } from "@angular/core";
// import { AppForm, AppFormControl, AppFormSubmit } from "../../models/app-form";
// import { AppFormComponent } from "../app-form/app-form.component";
// import { CardModule } from "primeng/card";
// import { SearchCriteria, SearchResult } from "../../services/base.service";
// import { FormControl, FormGroup } from "@angular/forms";

// export interface AppSearchPageDesc<T, F> {
//     name: string;
//     filter?: F;
//     defaultFilter: F;
//     defaultSort?: string;
//     filters: AppFormControl[];
//     columns: AppListColumnDefinition<T>[];
//     actions: AppAction[];
//     dataProvider: (filter: F) => Promise<SearchResult<T>>;
//     immediateLoad?: boolean;
// }

// export abstract class AppSearchPageBase<T, F> {
//     filters!: FormGroup;

//     constructor(filters: FormGroup) {
//         this.filters = filters;
//     }

//     getFilter(name: string) {
//         return this.filters.get(name) as FormControl;
//     }

//     protected abstract getDefaultFilters(): any;
// }

// @Component({
//     selector: 'app-page-search',
//     templateUrl: 'app-page-search.component.html',
//     standalone: true,
//     imports: [AppPage, AppFilterPanel, AppList, TranslateModule, AppFormComponent, CardModule]
// })
// export class AppSearchPage<T, F extends SearchCriteria> implements OnInit {
//     @Input() page!: AppSearchPageDesc<T, F>;

    

//     totalRows: number = 1;
    
    
//     items: T[] = [];
//     listLoading = false;

//     form!: AppForm;

//     clearFilter() {
//         this.page.filters.forEach(f => {
//             f.fc?.setValue((this.page.defaultFilter as any)[f.field]);
//         })
//     }

//     async search(actionCtx: AppActionContext) {
//         actionCtx.inProgress(true);
//         await this.loadList();
//         actionCtx.inProgress(false);
//     }

//     async loadList() {
//         console.log('load list')
//         this.listLoading = true;
//         let filterCriteria: { [key:string]: any } = {};
//         this.page.filters.forEach(x => filterCriteria[x.field] = x.fc?.value)
//         let baseCriteria = {
//             offset: this.offset,
//             rows: this.rows,
//             sortBy: this.sortField,
//             sortOrder: this.sortOrder
//         }
//         let fullCriteria = Object.assign(filterCriteria, baseCriteria);

//         console.log('fullCriteria', fullCriteria)

//         let searchResult = await this.page.dataProvider(fullCriteria as F);
//         this.totalRows = searchResult.totalRows;
//         this.items = searchResult.rows;
//         this.listLoading = false;
//     }

//     onChangeTable(e: any) {
//         console.log('change table')
//         this.offset = e.first;
//         this.rows = e.rows;
//         this.sortField = e.sortField;
//         this.sortOrder = e.sortOrder;
//         this.loadList();
//     }

//     ngOnInit(): void {
//         this.page.filter = this.page.defaultFilter;

//         this.form = {
//             controls: this.page.filters,
//             actions: [{
//                 label: 'app.clear',
//                 onClick: () => this.clearFilter(),
//                 icon: 'pi pi-filter-slash'
//             }, {
//                 label: 'app.search',
//                 submit: true,
//                 primary: true,
//                 icon: 'pi pi-search',
//                 onClick: (x) => this.search(x)
//             }]
//         };

//         if (this.page.defaultSort) {
//             let el = this.page.defaultSort.split(' ');
//             this.sortField = el[0];
//             this.sortOrder = el[1] == 'ASC' ? 1 : -1;
//         }

//         if (this.page.immediateLoad) {
//             this.loadList();
//         }
//     }
// }
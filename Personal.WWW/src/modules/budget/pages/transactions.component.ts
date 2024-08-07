import { Component } from '@angular/core';
import { Transaction, TransactionCriteria, TransactionService } from '../services/transactions.service';
import { Format } from '../../../core/helpers/formatters';
import { CategorySelect } from '../components/category-select/category-select.component';
import {TranslateModule} from '@ngx-translate/core';
import { AppSearchPageBase } from '../../../core/components/app-page-search/app-page-search.component';
import { AmountBarColumn } from '../components/amount-bar-column/amount-bar-column.component';
import { AppNumber } from '../../../core/controls/app-number.component';
import { AppDate } from '../../../core/controls/app-date.component';
import { FormGroup } from '@angular/forms';
import { AppListColumnDefinition } from '../../../core/components/app-list/app-list.component';


@Component({
    selector: 'transactions-page',
    template: ``,
    standalone: true,
    imports: [AmountBarColumn, CategorySelect, TranslateModule ]
})

export class TransactionsPage extends AppSearchPageBase<Transaction> {
    
    override getColumns(): AppListColumnDefinition<Transaction>[] {
        return []
    }

    override getResult(criteria: any) {
        return this.transactionService.search(criteria);
    }

    override getDefaultFilters () {
        return {
        };
    }

    constructor(private transactionService: TransactionService) 
    {
        super()
        // super({
        //     name: 'budget.transactions',
        //     defaultFilter: {
        //         dateFrom: '2024-08-01'
        //     },
        //     actions: [
        //         { icon: 'pi pi-plus', label: 'app.add' },
        //         { icon: 'pi pi-file-import', label: 'app.import' },
        //         { icon: 'pi pi-file-export', label: 'app.export' },
        //     ],
        //     filters: [
        //         { label: 'budget.category', field: 'categoryId', component: CategorySelect },
        //         { label: 'budget.dateFrom', field: 'dateFrom', component: AppDate },
        //         { label: 'budget.dateTo', field: 'dateTo', component: AppDate },
        //         { label: 'budget.amountMin', field: 'amountMin', component: AppNumber },
        //         { label: 'budget.amountMax', field: 'amountMax', component: AppNumber },
        //     ],
        //     columns: [
        //         { name: 'date', label: 'budget.date', value: x => x.date, sortable: true },
        //         { name: 'category', label: 'budget.category', value: x => x.categoryName, sortable: true },
        //         { name: 'description', label: 'budget.description', value: x => x.description, sortable: true },
        //         { name: 'amount', label: 'budget.amount', value: x => Format.decimal(x.amount), right: true, sortable: true },
        //         { name: 'bar', label: '', component: AmountBarColumn, width: '20%' },
        //     ],
        //     dataProvider: f => this.transactionService.search(f),
        //     immediateLoad: true,
        //     defaultSort: 'date ASC'
        // })
    }

    // fetchItems(filter: TransactionsFilter): Transaction[] {
    //     let transactions = this.transactionService.getTransactions();

    //     let maxAmount = Math.abs(transactions.sort((a, b) => Math.abs(a.amount) > Math.abs(b.amount) ? -1 : 1)[0].amount);

    //     for (let t of transactions) {
    //         t.relWidth = Math.floor(Math.abs(t.amount) / maxAmount * 100.0).toFixed(0)+'%';
    //     }

    //     return transactions;
    // }
}
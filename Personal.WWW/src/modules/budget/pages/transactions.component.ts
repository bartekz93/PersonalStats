import { Component } from '@angular/core';
import { Transaction, TransactionService } from '../services/transactions.service';
import { Format } from '../../../core/helpers/formatters';
import { CategorySelect } from '../components/category-select/category-select.component';
import {TranslateModule} from '@ngx-translate/core';
import { AppSearchPage, AppSearchPageBase } from '../../../core/components/app-page-search/app-page-search.component';
import { AmountBarColumn } from '../components/amount-bar-column/amount-bar-column.component';



export interface TransactionsFilter {
    categoryId?: number;
    dateFrom?: string;
    dateTo?: string;
    amountMin?: number;
    amountMax?: number;
}

@Component({
    selector: 'transactions-page',
    template: `<app-page-search [page]="page" />`,
    standalone: true,
    imports: [AmountBarColumn, CategorySelect, TranslateModule, AppSearchPage]
})

export class TransactionsPage extends AppSearchPageBase<Transaction, TransactionsFilter> {
    constructor(private transactionService: TransactionService) 
    {
        super({
            name: 'budget.transactions',
            defaultFilter: {
                dateFrom: '2024-08-01'
            },
            actions: [
                { icon: 'pi pi-plus', label: 'app.add' },
                { icon: 'pi pi-file-import', label: 'app.import' },
                { icon: 'pi pi-file-export', label: 'app.export' },
            ],
            filters: [
                { type: 'custom', label: 'budget.category', field: 'categoryId', component: CategorySelect },
                { type: 'date', label: 'budget.dateFrom', field: 'dateFrom' },
                { type: 'date', label: 'budget.dateTo', field: 'dateTo' },
                { type: 'number', label: 'budget.amountMin', field: 'amountMin' },
                { type: 'number', label: 'budget.amountMax', field: 'amountMax' },
            ],
            columns: [
                { name: 'date', label: 'budget.date', value: x => x.date, sortable: true },
                { name: 'category', label: 'budget.category', value: x => x.categoryName, sortable: true },
                { name: 'description', label: 'budget.description', value: x => x.description, sortable: true },
                { name: 'amount', label: 'budget.amount', value: x => Format.decimal(x.amount), right: true, sortable: true },
                { name: 'bar', label: '', component: AmountBarColumn, width: '20%' },
            ],
            dataProvider: f => this.fetchItems(f),
            immediateLoad: true,
            defaultSort: 'date ASC'
        })
    }

    override fetchItems(filter: TransactionsFilter): Transaction[] {
        let transactions = this.transactionService.getTransactions();

        let maxAmount = Math.abs(transactions.sort((a, b) => Math.abs(a.amount) > Math.abs(b.amount) ? -1 : 1)[0].amount);

        for (let t of transactions) {
            t.relWidth = Math.floor(Math.abs(t.amount) / maxAmount * 100.0).toFixed(0)+'%';
        }

        return transactions;
    }
}
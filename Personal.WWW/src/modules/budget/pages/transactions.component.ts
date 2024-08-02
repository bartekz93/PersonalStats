import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Transaction, TransactionService } from '../services/transactions.service';
import { TableModule } from 'primeng/table';
import { AppPage } from '../../../core/components/app-page/app-page.component';
import { AppFilterPanel, AppFilterPanelDefinition } from '../../../core/components/app-filter-panel/app-filter-panel.component';
import { AppPageAction } from '../../../core/models/app-page-action.model';
import { AppList, AppListColumnDefinition } from '../../../core/components/app-list/app-list.component';
import { Format } from '../../../core/helpers/formatters';
import { CategorySelect } from '../components/category-select/category-select.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'amount-bar-column',
    template: `<div [ngStyle]="getStyle()"></div>`
})

export class AmountBarColumn implements OnInit {
    constructor() { }

    @Input() value!: Transaction;
    
    ngOnInit(): void {
    }

    getStyle() {
        return {
            height: '10px',
            width: this.value.relWidth,
            backgroundColor: this.value.amount < 0 ? '#3760a4' : '#53aefc',
            borderRadius: '5px'
        }
    }
}

export interface TransactionsFilter {
    categoryId?: number;
    dateFrom?: string;
    dateTo?: string;
    amountMin?: number;
    amountMax?: number;
}

@Component({
    selector: 'transactions-page',
    templateUrl: 'transactions.component.html',
    styleUrl: 'transactions.component.scss',
    standalone: true,
    imports: [AppPage, AppFilterPanel, AppList, AmountBarColumn, CategorySelect, TranslateModule]
})

export class TransactionsPage implements OnInit {
    transactions: Transaction[] = [];
    filters: AppFilterPanelDefinition<TransactionsFilter>[] = [];
    columns: AppListColumnDefinition<Transaction>[] = [];
    filter: TransactionsFilter = {};
    actions: AppPageAction[] = [];


    constructor(private transactionService: TransactionService) {}

    clearFilter() {
        this.filter = {};
    }

    async fetchTransactions() {
        this.transactions = await this.transactionService.getTransactions();

        let maxAmount = Math.abs(this.transactions.sort((a, b) => Math.abs(a.amount) > Math.abs(b.amount) ? -1 : 1)[0].amount);

        for (let t of this.transactions) {
            t.relWidth = Math.floor(Math.abs(t.amount) / maxAmount * 100.0).toFixed(0)+'%';
        }
    }

    async ngOnInit() { 
        this.filters = [
            { type: 'custom', label: 'budget.category', field: 'categoryId', component: CategorySelect },
            { type: 'date', label: 'budget.dateFrom', field: 'dateFrom' },
            { type: 'date', label: 'budget.dateTo', field: 'dateTo' },
            { type: 'number', label: 'budget.amountMin', field: 'amountMin' },
            { type: 'number', label: 'budget.amountMax', field: 'amountMax' },
        ]

        this.columns = [
            { label: 'budget.date', value: x => x.date },
            { label: 'budget.category', value: x => x.categoryName },
            { label: 'budget.description', value: x => x.description },
            { label: 'budget.amount', value: x => Format.decimal(x.amount), right: true },
            { label: '', component: AmountBarColumn, width: '20%' },
        ]

        this.actions = [
            { icon: 'pi pi-plus', label: 'app.add' },
            { icon: 'pi pi-file-import', label: 'app.import' },
            { icon: 'pi pi-file-export', label: 'app.export' },
        ]

        await this.fetchTransactions()
    }
}
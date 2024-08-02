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
    imports: [AppPage, AppFilterPanel, AppList, AmountBarColumn, CategorySelect]
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
            { type: 'custom', label: 'Category', field: 'categoryId', component: CategorySelect },
            { type: 'date', label: 'Date from', field: 'dateFrom' },
            { type: 'date', label: 'Date to', field: 'dateTo' },
            { type: 'number', label: 'Amount min', field: 'amountMin' },
            { type: 'number', label: 'Amount max', field: 'amountMax' },
        ]

        this.columns = [
            { label: 'Data', value: x => x.date },
            { label: 'Kategoria', value: x => x.categoryName },
            { label: 'Opis', value: x => x.description },
            { label: 'Kwota', value: x => Format.decimal(x.amount), right: true },
            { label: '', component: AmountBarColumn, width: '20%' },
        ]

        this.actions = [
            { icon: 'pi pi-plus', label: 'Dodaj' },
            { icon: 'pi pi-file-import', label: 'Importuj' },
            { icon: 'pi pi-file-export', label: 'Eksportuj' },
        ]

        await this.fetchTransactions()
    }
}
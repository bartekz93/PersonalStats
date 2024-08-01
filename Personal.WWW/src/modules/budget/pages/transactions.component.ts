import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Transaction, TransactionService } from '../services/transactions.service';
import { TableModule } from 'primeng/table';
import { CategoryService } from '../services/category.service';
import { AppPage } from '../../../core/components/app-page/app-page.component';
import { AppFilterPanel } from '../../../core/components/app-filter-panel/app-filter-panel.component';
import { AppPageAction } from '../../../core/models/app-page-action.model';

@Component({
    selector: 'transactions-page',
    templateUrl: 'transactions.component.html',
    styleUrl: 'transactions.component.scss',
    standalone: true,
    imports: [FormsModule, InputNumberModule, CardModule, CalendarModule, DropdownModule, CommonModule, TableModule, AppPage, AppFilterPanel]
})

export class TransactionsPage implements OnInit {
    minAmount?: number;
    maxAmount?: number;
    selectedCategory?: number;
    description?: string;
    dateFrom?: string;
    dateTo?: string;

    categories: any[] = [];
    categoriesLoading: boolean = false;
    transactions: Transaction[] = [];

    actions: AppPageAction[] = [];

    constructor(
        private transactionService: TransactionService,
        private categoryService: CategoryService) {
    }

    getItemStyle(item: any, small: boolean) {
        return {
            width: small ? '16px' : '24px',
            height: small ? '16px' : '24px',
            fontSize: small ? '10px' : '12px',
            backgroundColor: item.color,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    async ngOnInit() { 
        this.categories = [
            { name: 'Żywność', code: 1, color: 'yellow', icon: 'pi pi-sun' },
            { name: 'Rachunki', code: 2, color: 'red', icon: 'pi pi-check' },
        ]

        this.actions = [
            {
                icon: 'pi pi-plus',
                label: 'Dodaj'
            },
            {
                icon: 'pi pi-file-import',
                label: 'Importuj'
            },
            {
                icon: 'pi pi-file-export',
                label: 'Eksportuj'
            },
        ]

        this.transactions = await this.transactionService.getTransactions();

        this.categoriesLoading = true;
        this.categoryService.getList().subscribe(data => {
            this.categories = data.rows;
            this.categoriesLoading = false;
        })
    }

    onClick(e: string) {
        console.log(e);
    }
}
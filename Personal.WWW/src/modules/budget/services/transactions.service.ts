import { Injectable } from "@angular/core";
import { BaseService, SearchCriteria, SearchResult } from "../../../core/services/base.service";

export interface Transaction {
    date: string;
    description: string;
    amount: number;
    categoryId: number;
    categoryName: string;
    relWidth?: string;
}

export interface TransactionSearchItem {
    id: number;
    date: string;
    description: string;
    amount: number;
    categoryId: number;
    categoryName: string;
    categoryColor: string;
    categoryIcon: string;
    walletCurrency: string;
    walletId: number;
    walletName: string;
    walletColor: string;
    relWidth: string;
}

export interface TransactionEdit {
    id: number;
    date: string;
    description: string;
    amount: number;
    categoryId: number;
    walletId: number;
}

export interface TransactionCriteria extends SearchCriteria {
    dateFrom?: string;
    dateTo?: string;
    amountMin?: number;
    amountMax?: number;
    categoryIds?: string;
    walletIds?: string;
    description?: string;
}

@Injectable({providedIn: 'root'})
export class TransactionService extends BaseService {

    search(criteria: TransactionCriteria): Promise<SearchResult<TransactionSearchItem>> {
        return this.get('budget\\transactions', criteria);
    }

    create(edit: TransactionEdit): Promise<any> {
        return this.post('budget\\transactions', edit);
    }

    edit(edit: TransactionEdit): Promise<any> {
        return this.put('budget\\transactions', edit);
    }

    remove(id: number): Promise<any> {
        return this.delete(`budget\\transactions\${id}`);
    }
}
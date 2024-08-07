import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService, SearchCriteria, SearchResult } from "../../../core/services/base.service";

export interface Transaction {
    date: string;
    description: string;
    amount: number;
    categoryId: number;
    categoryName: string;
    relWidth?: string;
}

export interface TransactionCriteria extends SearchCriteria {
    dateFrom?: string;
    dateTo?: string;
    amountMin?: number;
    amountMax?: number;
    categoryId?: number;
}

@Injectable({providedIn: 'root'})
export class TransactionService extends BaseService {

    search(criteria: TransactionCriteria): Promise<SearchResult<Transaction>> {
        return this.get('budget\transactions');
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface Transaction {
    date: string;
    description: string;
    amount: number;
    categoryId: number;
    categoryName: string;
}

@Injectable({providedIn: 'root'})
export class TransactionService {
    constructor(private httpClient: HttpClient) {
        
    }

    async getTransactions(): Promise<Transaction[]> {
        this.httpClient.get("")

        return [
            {
                date: '2024-01-01',
                description: '',
                amount: 10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 10.0,
                categoryId: 1,
                categoryName: ''
            },
        ]
    }
}
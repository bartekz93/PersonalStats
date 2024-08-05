import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Transaction {
    date: string;
    description: string;
    amount: number;
    categoryId: number;
    categoryName: string;
    relWidth?: string;
}

@Injectable({providedIn: 'root'})
export class TransactionService {
    constructor(private httpClient: HttpClient) {
        
    }

    getTransactions(): Transaction[] {
        return [
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -10.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: -25.0,
                categoryId: 1,
                categoryName: ''
            },
            {
                date: '2024-01-01',
                description: '',
                amount: 50.0,
                categoryId: 1,
                categoryName: ''
            },
        ]
    }
}
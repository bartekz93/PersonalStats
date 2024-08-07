import { Injectable } from "@angular/core";
import { BaseService, SearchCriteria, SearchResult } from "../../../core/services/base.service";

export interface WalletSearchItem {
    id: number;
    name: string;
    color: string;
    currency: string;
}

export interface WalletSearchCriteria extends SearchCriteria {
    name?: string;
    currency?: number;
}

export interface WalletEdit {
    name: string;
    currency: number;
    color: string;
}

@Injectable({providedIn: 'root'})
export class WalletService extends BaseService {

    search(criteria: WalletSearchCriteria): Promise<SearchResult<WalletSearchItem>> {
        return this.get("budget/wallets", criteria);
    }

    create(edit: WalletEdit) {
        return this.post("budget/wallets", edit);
    }
}
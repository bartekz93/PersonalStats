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

    async search(criteria: WalletSearchCriteria): Promise<SearchResult<WalletSearchItem>> {
        return this.get("budget/wallets", criteria);
    }

    async create(edit: WalletEdit) {
        return this.post("budget/wallets", edit);
    }

    async edit(edit: WalletEdit) {
        console.log('edit')
        return this.put("budget/wallets", edit);
    }

    async remove(id: number) {
        return this.delete(`budget/wallets/${id}`);
    }
}
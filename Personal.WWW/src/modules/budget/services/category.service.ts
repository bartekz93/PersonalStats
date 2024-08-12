import { Injectable } from "@angular/core";
import { BaseService, SearchCriteria, SearchResult } from "../../../core/services/base.service";

export interface CategorySearchItem {
    id: number;
    type: string;
    name: string;
    color: string;
    icon: string;
}

export interface CategorySearchCriteria extends SearchCriteria {
    name?: string;
    type?: number;
}

export interface CategoryEdit {
    name: string;
    type: number;
    color: string;
    icon: string;
}

@Injectable({providedIn: 'root'})
export class CategoryService extends BaseService {

    async search(criteria: CategorySearchCriteria): Promise<SearchResult<CategorySearchItem>> {
        return this.get("budget/categories", criteria);
    }

    async create(edit: CategoryEdit) {
        return this.post("budget/categories", edit);
    }

    async edit(edit: CategoryEdit) {
        return this.put("budget/categories", edit);
    }

    async remove(id: number) {
        return this.delete(`budget/categories/${id}`);
    }
}
import { Injectable } from "@angular/core";
import { BaseService } from "../../../core/services/base.service";

export interface Category {
    id: number;
    name: string;
    type: string;
}

export interface SearchResult<T> {
    rows: T[];
    totalRows: number;
}

@Injectable({providedIn: 'root'})
export class CategoryService extends BaseService {

    getList() {
        return this.get<SearchResult<Category>>("categories");
    }
}
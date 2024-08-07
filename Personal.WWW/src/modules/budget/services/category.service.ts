import { Injectable } from "@angular/core";
import { BaseService, SearchResult } from "../../../core/services/base.service";

export interface Category {
    id: number;
    name: string;
    type: string;
}


@Injectable({providedIn: 'root'})
export class CategoryService extends BaseService {

    getList() {
        return this.get<SearchResult<Category>>("categories");
    }
}
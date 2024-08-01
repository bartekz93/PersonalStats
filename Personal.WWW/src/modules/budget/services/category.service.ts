import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environment/dev.env";

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
class BaseService {
    private apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {
    }

    protected get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(`${this.apiUrl}\\${url}`);
    }
}

@Injectable({providedIn: 'root'})
export class CategoryService extends BaseService {

    getList() {
        return this.get<SearchResult<Category>>("categories");
    }
}
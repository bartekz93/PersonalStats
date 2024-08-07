import { Injectable } from "@angular/core";
import { environment } from "../../environment/dev.env";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, firstValueFrom, throwError } from "rxjs";
import { AppAction, AppActionContext } from "../models/app-page-action.model";

export interface SearchResult<T> {
    rows: T[];
    totalRows: number;
}

export interface SearchCriteria {
    offset?: number;
    rows?: number;
    sortBy?: string;
    sortOrder?: number;
}

@Injectable({providedIn: 'root'})
export class BaseService {
    private apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {
    }

    prepareQuery(obj: any) {
        return '?'+Object.keys(obj).filter(x => obj[x] != undefined).map(x => `${x}=${obj[x]}`).join('&')
    }

    protected get<T>(url: string, obj?: any): Promise<T> {
        return firstValueFrom(this.httpClient.get<T>(`${this.apiUrl}\\${url}${obj ? this.prepareQuery(obj) : ''}`, { withCredentials: true }));
    }

    protected get$<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(`${this.apiUrl}\\${url}`);
    }

    protected post<T>(url: string, obj: any): Promise<T> {
        return firstValueFrom(this.httpClient.post<T>(`${this.apiUrl}\\${url}`, obj, { withCredentials: true }));
    }
}
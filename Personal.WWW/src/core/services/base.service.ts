import { Injectable } from "@angular/core";
import { environment } from "../../environment/dev.env";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, firstValueFrom, throwError } from "rxjs";
import { AppAction, AppActionContext } from "../models/app-page-action.model";

@Injectable({providedIn: 'root'})
export class BaseService {
    private apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {
    }

    protected get<T>(url: string): Promise<T> {
        return firstValueFrom(this.httpClient.get<T>(`${this.apiUrl}\\${url}`));
    }

    protected get$<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(`${this.apiUrl}\\${url}`);
    }

    protected post<T>(url: string, obj: any): Promise<T> {
        return firstValueFrom(this.httpClient.post<T>(`${this.apiUrl}\\${url}`, obj));
    }
}
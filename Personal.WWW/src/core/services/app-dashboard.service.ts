import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface DashboardTileDesc {
    strongName: string;
    component: any;
    icon: string;
    title: string;
}

export interface AppDashboardParams {
    dateFrom: Date;
    dateTo: Date;
}

@Injectable({providedIn: 'root'})
export class AppDashboardService {
    private tiles: DashboardTileDesc[] = [];

    private params?: AppDashboardParams;
    private paramsSubject = new Subject<AppDashboardParams>();
    params$ = this.paramsSubject.asObservable();

    setParams(params: AppDashboardParams) {
        this.params = params;
        this.paramsSubject.next(params);
    }

    getParams() {
        return this.params;
    }

    register(tileDesc: DashboardTileDesc) {
        this.tiles.push(tileDesc);
    }

    get(strongName: string) {
        return this.tiles.find(x => x.strongName == strongName);
    }

    all() {
        return this.tiles;
    }
}
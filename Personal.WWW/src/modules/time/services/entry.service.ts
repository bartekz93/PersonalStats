import { Injectable } from "@angular/core";
import { BaseService, SearchCriteria, SearchResult } from "@core/services/base.service";

export interface EntrySearchItem {
    id: number;
    dateFrom: string;
    dateTo: string;
    description: string;
    activityId: number;
    activityName: string;
    activityIcon: string;
    activityColor: string;
}

export interface EntrySearchCriteria extends SearchCriteria {
    dateFrom?: string;
    dateTo?: string;
}

export interface EntryEdit {
    id: number;
    date: string;
    timeFrom?: string;
    timeTo?: string;
    description: string;
    activityId: number | null;
}

@Injectable({providedIn: 'root'})
export class EntryService extends BaseService {

    async search(criteria: EntrySearchCriteria): Promise<SearchResult<EntrySearchItem>> {
        return this.get("time/entries", criteria);
    }

    async create(edit: EntryEdit) {
        return this.post("time/entries", edit);
    }

    async edit(edit: EntryEdit) {
        return this.put("time/entries", edit);
    }

    async remove(id: number) {
        return this.delete(`time/entries/${id}`);
    }
}
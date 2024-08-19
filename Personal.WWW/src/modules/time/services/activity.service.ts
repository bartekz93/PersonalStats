import { Injectable } from "@angular/core";
import { BaseService, SearchCriteria, SearchResult } from "@core/services/base.service";

export interface ActivitySearchItem {
    id: number;
    name: string;
    color: string;
    icon: string;
}

export interface ActivitySearchCriteria extends SearchCriteria {
    name?: string;
}

export interface ActivityEdit {
    name: string;
    color: string;
    icon: string;
}

@Injectable({providedIn: 'root'})
export class ActivityService extends BaseService {

    async search(criteria: ActivitySearchCriteria): Promise<SearchResult<ActivitySearchItem>> {
        return this.get("time/activities", criteria);
    }

    async create(edit: ActivityEdit) {
        return this.post("time/activities", edit);
    }

    async edit(edit: ActivityEdit) {
        return this.put("time/activities", edit);
    }

    async remove(id: number) {
        return this.delete(`time/activities/${id}`);
    }
}
import { Injectable } from "@angular/core";
import { BaseService, SearchCriteria, SearchResult } from "@core/services/base.service";

export interface MealSearchItem {
    id: number;
    date: string;
    foodId: number;
    foodColor: string;
    foodName: string;
    quantity: number;
    kcal: number;
}

export interface MealSearchCriteria extends SearchCriteria {
    dateFrom?: string;
    dateTo?: string;
}

export interface MealEdit {
    id?: number;
    foodId: number;
    date: string;
    quentity: number;
}

@Injectable({providedIn: 'root'})
export class MealService extends BaseService {

    async search(criteria: MealSearchCriteria): Promise<SearchResult<MealSearchItem>> {
        return new Promise((resolve) => {
            resolve({
                rows: [
                    { foodId: 1, foodColor: '#d56767', date: '2024-08-19', foodName: 'Produkt 1', quantity: 4, kcal: 400 },
                    { foodId: 1, foodColor: '#d56767', date: '2024-08-20', foodName: 'Produkt 1', quantity: 4, kcal: 400 },
                    { foodId: 1, foodColor: '#d56767', date: '2024-08-21', foodName: 'Produkt 1', quantity: 4, kcal: 400 },
                    { foodId: 2, foodColor: '#8eee8e', date: '2024-08-22', foodName: 'Produkt 2', quantity: 1, kcal: 800 },
                    { foodId: 2, foodColor: '#8eee8e', date: '2024-08-19', foodName: 'Produkt 2', quantity: 1, kcal: 800 },
                    { foodId: 2, foodColor: '#8eee8e', date: '2024-08-23', foodName: 'Produkt 2', quantity: 1, kcal: 800 },
                    { foodId: 3, foodColor: '#6a6eec', date: '2024-08-21', foodName: 'Produkt 3', quantity: 1, kcal: 300 },
                    { foodId: 3, foodColor: '#6a6eec', date: '2024-08-19', foodName: 'Produkt 3', quantity: 1, kcal: 300 },
                    { foodId: 3, foodColor: '#6a6eec', date: '2024-08-24', foodName: 'Produkt 3', quantity: 1, kcal: 300 },
                    { foodId: 4, foodColor: 'pink', date: '2024-08-25', foodName: 'Produkt 4', quantity: 3, kcal: 600 },
                    { foodId: 4, foodColor: 'pink', date: '2024-08-22', foodName: 'Produkt 4', quantity: 3, kcal: 600 },
                    { foodId: 4, foodColor: 'pink', date: '2024-08-23', foodName: 'Produkt 4', quantity: 3, kcal: 600 },
                    { foodId: 5, foodColor: 'silver', date: '2024-08-21', foodName: 'Produkt 5', quantity: 5, kcal: 500 },
                    { foodId: 5, foodColor: 'silver', date: '2024-08-19', foodName: 'Produkt 5', quantity: 5, kcal: 500 },
                    { foodId: 5, foodColor: 'silver', date: '2024-08-24', foodName: 'Produkt 5', quantity: 5, kcal: 500 },
                    { foodId: 6, foodColor: '#fbfb86', date: '2024-08-24', foodName: 'Produkt 6', quantity: 2, kcal: 200 },
                    { foodId: 6, foodColor: '#fbfb86', date: '2024-08-25', foodName: 'Produkt 6', quantity: 2, kcal: 200 },
                    { foodId: 6, foodColor: '#fbfb86', date: '2024-08-21', foodName: 'Produkt 6', quantity: 2, kcal: 200 },
                    { foodId: 7, foodColor: 'lightblue', date: '2024-08-23', foodName: 'Produkt 7', quantity: 4, kcal: 700 },
                    { foodId: 7, foodColor: 'lightblue', date: '2024-08-22', foodName: 'Produkt 7', quantity: 4, kcal: 700 },
                    { foodId: 7, foodColor: 'lightblue', date: '2024-08-19', foodName: 'Produkt 7', quantity: 4, kcal: 700 },
                ],
                totalRows: 10
            } as SearchResult<MealSearchItem>)
        })
        //return this.get("diet/meals", criteria);
    }

    async create(edit: MealEdit) {
        return this.post("diet/meals", edit);
    }

    async edit(edit: MealEdit) {
        return this.put("diet/meals", edit);
    }

    async remove(id: number) {
        return this.delete(`diet/meals/${id}`);
    }
}
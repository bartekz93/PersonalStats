import * as _ from 'lodash'
import { Component, OnInit } from '@angular/core';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppCardComponent } from '@core/components/app-card/app-card.component';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';
import { AppPage } from '@core/components/app-page/app-page.component';
import { AppSmallCalendarComponent } from '@core/components/app-small-calendar/app-small-calendar.component';
import { AppDate } from '@core/controls/app-date.component';
import { AppCalendarService } from '@core/services/app-calendar.service';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { MealSearchItem, MealService } from 'modules/diet/services/meal.service';
import { ChartModule } from 'primeng/chart';

interface MealsDayItem {
    meals: MealSearchItem[];
    sum: number;
}

@Component({
    standalone: true,
    imports: [AppPage, AppCardComponent, AppButtonComponent, AppSmallCalendarComponent, ChartModule, AppCircleLabelComponent, AppDate],
    selector: 'diet-meals',
    templateUrl: 'meals.component.html',
    styleUrl: 'meals.component.scss'
})

export class MealsComponent implements OnInit {
    constructor(private appCalendarService: AppCalendarService, private mealService: MealService) { }

    date = new Date()

    items: MealsDayItem[] = [];


    days: any[] = [];
    weekdays = ["pon.","wt.","śr.","czw.","pt.","sob.", "niedz."];
    kcalChartData?: ChartData;
    kcalChartOptions?: ChartOptions;

    onChangeDate(date: Date) {
        this.date = date;
        this.prepareDays();
        this.refresh();
    }

    async refresh() {
        let dateFrom = this.appCalendarService.getWeekStart(this.date);
        let dateTo = this.appCalendarService.getWeekEnd(this.date);
        let items = await this.mealService.search({
            dateFrom: dateFrom.toJSON().substring(0, 10),
            dateTo: dateTo.toJSON().substring(0, 10),
        })

        this.items = [];
        for (let day of this.days) {
            let meals = items.rows.filter(x => x.date == day.date)
            this.items.push({
                meals: meals,
                sum: meals.map(x => x.kcal).reduce((p, a) => p+a, 0)
            });
        }

        let foods = _.uniqBy(items.rows, x => x.foodName).map(x => ({
            id: x.foodId,
            name: x.foodName,
            color: x.foodColor
        }))

        this.kcalChartData = {
            labels: this.days.map(x => x.label),
            datasets: foods.map(f => ({
                type: 'bar',
                label: f.name,
                backgroundColor: f.color,
                data: this.items.map(x => x.meals.filter(m => m.foodId == f.id).map(m => m.kcal).reduce((p, a) => p+a, 0) )
            } as ChartDataset
        ))}

        console.log(this.kcalChartData);

        this.kcalChartOptions = {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        };
    }

    prepareDays() {
        let today = new Date().toJSON().substring(0, 10);
        this.days = this.appCalendarService.getWeek(this.date).map((x, i) => ({
            index: i,
            date: x.toJSON().substring(0, 10),
            day: x.getDate(),
            isToday: today == x.toJSON().substring(0, 10),
            label: this.weekdays[i],
        }))
    }

    ngOnInit() { 
        this.prepareDays();
        this.refresh();
    }
}
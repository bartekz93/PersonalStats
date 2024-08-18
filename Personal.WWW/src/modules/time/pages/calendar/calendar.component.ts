import { Component, OnInit } from '@angular/core';
import { AppPage } from '@core/components/app-page/app-page.component';
import { AppDate } from "../../../../core/controls/app-date.component";
import { AppWeekCalendarComponent, AppWeekCalendarItem, AppWeekCalendarSelectEvent } from '@core/components/app-week-calendar/app-week-calendar.component';
import { AppSmallCalendarComponent } from '@core/components/app-small-calendar/app-small-calendar.component';

@Component({
    standalone: true,
    imports: [AppPage, AppWeekCalendarComponent, AppDate, AppSmallCalendarComponent],
    selector: 'calendar',
    templateUrl: 'calendar.component.html'
})

export class CalendarPage implements OnInit {
    constructor() { }

    ngOnInit() { }

    date = new Date();

    items: AppWeekCalendarItem[] = [
        {
            date: '2024-08-17',
            timeFrom: '01:00',
            timeTo: '06:00',
        }
    ];

    onSelect(e: AppWeekCalendarSelectEvent) {
        console.log(e);
    }

    onDateChange(date: any) {
        console.log(date)
    }
}
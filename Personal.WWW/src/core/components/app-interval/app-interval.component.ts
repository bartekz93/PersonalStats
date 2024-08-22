import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppCalendarService, CalendarInterval } from '@core/services/app-calendar.service';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { AppButtonComponent } from '../app-button/app-button.component';
import { TranslateModule } from '@ngx-translate/core';

export interface AppIntervalDates {
    dateFrom: Date;
    dateTo: Date;
}

@Component({
    standalone: true,
    imports: [ OverlayPanelModule, CommonModule, AppButtonComponent, TranslateModule],
    selector: 'app-interval',
    styleUrl: 'app-interval.component.scss',
    templateUrl: 'app-interval.component.html'
})

export class AppIntervalComponent implements OnInit {
    constructor(private calendarService: AppCalendarService) { }

    @ViewChild('op') panel?: OverlayPanel;

    @Output() onSelect = new EventEmitter();

    interval: CalendarInterval = CalendarInterval.month;
    index = 0;

    dateFrom?: Date;
    dateTo?: Date;

    labels = {
        "week0": 'app.thisWeek',
        "week-1": 'app.prevWeek',
        "week1": 'app.nextWeek',
        "month0": 'app.thisMonth',
        "month-1": 'app.prevMonth',
        "month1": 'app.nextMonth',
        "year0": 'app.thisYear',
        "year-1": 'app.prevYear',
        "year1": 'app.nextYear',
    }

    ngOnInit() { 
        this.updateDates();
    }

    open(e: MouseEvent) {
        this.panel?.toggle(e);
    }

    label() {
        let intervalStr = this.calendarService.intervalToString(this.interval);
        let key = intervalStr+this.index;
        if (Object.keys(this.labels).includes(key)) {
            return (this.labels as any)[key];
        }
        return null;
    }

    updateDates() {
        let dates = this.calendarService.getIntervalDates(this.interval, this.index);
        this.dateFrom = dates.start;
        this.dateTo = dates.end;

        this.onSelect.emit({
            dateFrom: this.dateFrom,
            dateTo: this.dateTo
        } as AppIntervalDates);
    }

    set(interval: string, index: number) {
        this.interval = this.calendarService.stringToInterval(interval) || CalendarInterval.week;
        this.index = index;
        this.updateDates();
        this.panel?.hide()
    }

    next() {
        this.index++;
        this.updateDates();
    }

    prev() {
        this.index--;
        this.updateDates();
    }
}
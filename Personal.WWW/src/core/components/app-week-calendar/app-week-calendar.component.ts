import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppCalendarService } from '@core/services/app-calendar.service';
import { AppButtonComponent } from "../app-button/app-button.component";
import { AppCircleLabelComponent } from '../app-circle-label/app-circle-label.component';

export interface AppWeekCalendarSelectEvent {
    date: string;
    timeFrom: string;
    timeTo: string;
}

export interface AppWeekCalendarItem {
    id: number;
    date: string;
    timeFrom: string;
    timeTo: string;
    color: string;
    data: any;
    icon?: string;
    line1?: string;
    line2?: string;
    loading?: boolean;
}

interface AppWeekCalendarItemInternal {
    baseItem: AppWeekCalendarItem;
    top: number;
    height: number;
    dayIndex: number;
}

interface AppWeekCalendarInterval {
    index: number;
    minutesFrom: number;
    minutesTo: number;
}

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        AppButtonComponent,
        AppCircleLabelComponent],
    selector: 'app-week-calendar',
    templateUrl: 'app-week-calendar.component.html',
    styleUrl: 'app-week-calendar.component.scss'
})

export class AppWeekCalendarComponent implements OnInit {
    constructor(private calendarService: AppCalendarService) { }

    @Output() onSelect = new EventEmitter<AppWeekCalendarSelectEvent>();
    @Output() onEdit = new EventEmitter<AppWeekCalendarItem>();
    @Output() onRemove = new EventEmitter<AppWeekCalendarItem>();

    @Input() items: AppWeekCalendarItem[] = [];
    internalItems: AppWeekCalendarItemInternal[] = [];

    @Input() date = new Date();
    @Input() loading = false;

    @Input() intervalStart = 0;
    @Input() intervalEnd = 1440;
    @Input() intervalInMin = 30
    @Input() intervalPx = 20

    weekdays = ["pon.","wt.","śr.","czw.","pt.","sob.", "niedz."];
    days: any[] = [];


    intervals: AppWeekCalendarInterval[] = []
    labels: any[] = []

    isSelecting = false;
    selectedDayIndex = -1;
    
    firstSelectedInterval = -1;
    minSelectedInterval = -1;
    maxSelectedInterval = -1;

    ngOnChanges() {
        this.prepareDays();
        this.prepareItems();
    }

    onClickItem(item: AppWeekCalendarItemInternal) {
        this.onEdit.emit(item.baseItem);
    }

    onRemoveItem(e: MouseEvent, item: AppWeekCalendarItemInternal) {
        e.stopPropagation();
        this.onRemove.emit(item.baseItem);
    }

    onMouseDown(dayIndex: number, intervalIndex: number) {
        this.selectedDayIndex = dayIndex;
        this.firstSelectedInterval = intervalIndex;
        this.minSelectedInterval = intervalIndex;
        this.maxSelectedInterval = intervalIndex;
    }

    onMouseUp(dayIndex: number, intervalIndex: number) {
        this.onSelect.emit({
            date: this.days[this.selectedDayIndex].date,
            timeFrom: this.calendarService.minutesToTime(this.intervals[this.minSelectedInterval].minutesFrom),
            timeTo: this.calendarService.minutesToTime(this.intervals[this.maxSelectedInterval].minutesTo)
        });

        this.selectedDayIndex = -1;
        this.firstSelectedInterval = -1;
        this.minSelectedInterval = -1;
        this.maxSelectedInterval = -1;
    }

    onMouseEnter(dayIndex: number, intervalIndex: number) {
        if (dayIndex == this.selectedDayIndex) {

            if (intervalIndex > this.firstSelectedInterval) {
                this.minSelectedInterval = this.firstSelectedInterval;
                this.maxSelectedInterval = intervalIndex;
            } else {
                this.minSelectedInterval = intervalIndex;
                this.maxSelectedInterval = this.firstSelectedInterval;
            }
        }
    }

    isSelected(dayIndex: number, intervalIndex: number) {
        return this.selectedDayIndex == dayIndex && intervalIndex >= this.minSelectedInterval && intervalIndex <= this.maxSelectedInterval;
    }

    getIntervalStyle() {
        return { 
            minHeight: `${this.intervalPx}px`
        }
    }

    getItemStyle(item: AppWeekCalendarItemInternal) {
        return {
            top: `${item.top}px`,
            height: `${item.height}px`,
            backgroundColor: this.addAlpha(item.baseItem.color, 0.3),
        }
    }

    addAlpha(color: string, opacity: number) {
        var _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }

    prepareDays() {
        let today = new Date().toJSON().substring(0, 10);
        let week = this.calendarService.getWeek(this.date);
        this.days = week.map((day, i) => ({
            index: i,
            date: day.toISOString().substring(0, 10),
            day: day.getDate(),
            label: this.weekdays[i],
            isToday: today == day.toJSON().substring(0, 10)
        }))
    }

    prepareIntervals() {
        this.intervals = [];
        let intervalSpan = this.intervalEnd - this.intervalStart;
        let intervalsCount = intervalSpan/this.intervalInMin;

        for (let i=0;i<intervalsCount;i++) {
            let minutes = i*this.intervalInMin+this.intervalStart
            this.intervals.push({
                index: i,
                minutesFrom: minutes,
                minutesTo: minutes+this.intervalInMin,
            })

            if (minutes%60 == 0) {
                this.labels.push({
                    top: i*this.intervalPx-10,
                    label: this.calendarService.minutesToTime(minutes),
                })
            }
        }
    }

    prepareItems() {
        this.internalItems = [];
        for (let item of this.items) {
            let day = this.days.find(d => d.date == item.date);
            if (!day) continue;

            let pxPerMinute = this.intervalPx / this.intervalInMin
            let minutesFrom = this.calendarService.timeToMinutes(item.timeFrom)
            let minutesTo = this.calendarService.timeToMinutes(item.timeTo)
            let minutesSpan = minutesTo - minutesFrom;

            this.internalItems.push({
                baseItem: item,
                dayIndex: day.index,
                top: minutesFrom*pxPerMinute,
                height: minutesSpan*pxPerMinute
            });
        }
    }


    ngOnInit() { 
        this.prepareDays();
        this.prepareIntervals();
    }
}
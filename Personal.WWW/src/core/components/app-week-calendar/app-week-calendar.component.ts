import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface AppWeekCalendarSelectEvent {
    date: string;
    timeFrom: string;
    timeTo: string;
}

export interface AppWeekCalendarItem {
    date: string;
    timeFrom: string;
    timeTo: string;
}

interface AppWeekCalendarItemInternal {
    date: string;
    timeFrom: string;
    timeTo: string;
    top: string;
    height: string;
    dayIndex: number;
}

interface AppWeekCalendarInterval {
    index: number;
    minutesFrom: number;
    minutesTo: number;
}

@Component({
    standalone: true,
    imports: [ CommonModule ],
    selector: 'app-week-calendar',
    templateUrl: 'app-week-calendar.component.html',
    styleUrl: 'app-week-calendar.component.scss'
})

export class AppWeekCalendarComponent implements OnInit {
    constructor() { }

    @Output() onSelect = new EventEmitter<AppWeekCalendarSelectEvent>();

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

    onMouseDown(dayIndex: number, intervalIndex: number) {
        this.selectedDayIndex = dayIndex;
        this.firstSelectedInterval = intervalIndex;
        this.minSelectedInterval = intervalIndex;
        this.maxSelectedInterval = intervalIndex;
    }

    onMouseUp(dayIndex: number, intervalIndex: number) {
        this.onSelect.emit({
            date: this.days[this.selectedDayIndex].date,
            timeFrom: this.minutesToTime(this.intervals[this.minSelectedInterval].minutesFrom),
            timeTo: this.minutesToTime(this.intervals[this.maxSelectedInterval].minutesTo)
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
            top: item.top,
            height: item.height
        }
    }

    prepareDays() {
        this.days = [];
        let d = this.date.getDay();

        let weekStart = new Date(this.date);
        weekStart.setHours(8)
        weekStart.setDate(weekStart.getDate()-(d+13)%7);

        for (let i=0;i<7;i++) {
            let day = new Date(weekStart);
            this.days.push({
                index: i,
                date: day.toISOString().substring(0, 10),
                day: day.getDate(),
                label: this.weekdays[i]
            });
            weekStart.setDate(weekStart.getDate()+1);
        }
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
                    label: this.minutesToTime(minutes),
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
            let minutesFrom = this.timeToMinutes(item.timeFrom)
            let minutesTo = this.timeToMinutes(item.timeTo)
            let minutesSpan = minutesTo - minutesFrom;

            this.internalItems.push({
                date: item.date,
                dayIndex: day.index,
                timeFrom: item.timeFrom,
                timeTo: item.timeTo,
                top: `${minutesFrom*pxPerMinute}px`,
                height: `${minutesSpan*pxPerMinute}px`
            });
        }
    }


    ngOnInit() { 
        this.prepareDays();
        this.prepareIntervals();
    }

    minutesToTime(minutes: number) {
        let part1 = `00${Math.floor(minutes/60)}`.slice(-2)
        let part2 = `00${minutes%60}`.slice(-2);
        return `${part1}:${part2}`
    }

    timeToMinutes(time: string) {
        let el = time.split(':');
        return Number.parseInt(el[0])*60+Number.parseInt(el[1]);
    }
}
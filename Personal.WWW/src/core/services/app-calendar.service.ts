import { Injectable } from "@angular/core";

export enum CalendarInterval {
    week, month, year
}

@Injectable({providedIn: 'root'})
export class AppCalendarService {
    intervalToString(interval: CalendarInterval) {
        switch (interval) {
            case CalendarInterval.week: return 'week'
            case CalendarInterval.month: return 'month'
            case CalendarInterval.year: return 'year'
        }
    }

    stringToInterval(interval: string) {
        switch (interval) {
            case 'week': return CalendarInterval.week
            case 'month': return CalendarInterval.month
            case 'year': return CalendarInterval.year
        }
        return null;
    }

    add(interval: CalendarInterval, date: Date, count: number) {
        switch (interval) {
            case CalendarInterval.week: return this.addWeeks(date, count);
            case CalendarInterval.month: return this.addMonths(date, count);
            case CalendarInterval.year: return this.addYear(date, count);
        }
    }

    getStart(interval: CalendarInterval, date: Date) {
        switch (interval) {
            case CalendarInterval.week: return this.getWeekStart(date);
            case CalendarInterval.month: return this.getMonthStart(date);
            case CalendarInterval.year: return this.getYearStart(date);
        }
    }

    getEnd(interval: CalendarInterval, date: Date) {
        switch (interval) {
            case CalendarInterval.week: return this.getWeekEnd(date);
            case CalendarInterval.month: return this.getMonthEnd(date);
            case CalendarInterval.year: return this.getYearEnd(date);
        }
    }

    getWeekStart(date: Date) {
        let day = date.getDay();
        let weekStart = new Date(date);
        weekStart.setHours(8)
        weekStart.setDate(weekStart.getDate()-(day+13)%7);
        return weekStart;
    }

    getWeekEnd(date: Date) {
        let weekEnd = this.getWeekStart(date);
        weekEnd.setDate(weekEnd.getDate()+6);
        return weekEnd;
    }

    addWeeks(date: Date, count: number) {
        return new Date(date.setDate(date.getDate() + 7*count));
    }

    getMonthStart(date: Date) {
        let y = date.getFullYear(), m = date.getMonth();
        return new Date(y, m, 1);
    }

    getMonthEnd(date: Date) {
        let y = date.getFullYear(), m = date.getMonth();
        return new Date(y, m+1, 0);
    }

    addMonths(date: Date, count: number) {
        return new Date(date.setMonth(date.getMonth() + count));
    }

    getYearStart(date: Date) {
        let y = date.getFullYear()

        return new Date(y, 0, 1);
    }

    getYearEnd(date: Date) {
        let y = date.getFullYear()
        return new Date(y+1, 0, 0);
    }

    addYear(date: Date, count: number) {
        return new Date(date.setFullYear(date.getFullYear() + count));
    }

    getWeek(date: Date) {
        let dayIter = this.getWeekStart(date);
        let dates = [];
        for (let i=0;i<7;i++) {
            dates.push(new Date(dayIter))
            dayIter.setDate(dayIter.getDate()+1);
        }
        return dates;
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

    dateOnly(datetime: string) {
        return datetime.split('T')[0];
    }

    timeOnly(datetime: string) {
        return datetime.split('T')[1].substring(0, 5);
    }

    getIntervalDates(interval: CalendarInterval, index: number) {
        let d = new Date();

        let currentStart = this.getStart(interval, d);
        let start = this.add(interval, currentStart, index);
        let end = this.getEnd(interval, start);

        return { start, end }
    }
}
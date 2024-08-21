import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AppCalendarService {
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
}
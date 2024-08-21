import { Component, OnInit } from '@angular/core';
import { AppPage } from '@core/components/app-page/app-page.component';
import { AppDate } from "../../../../core/controls/app-date.component";
import { AppWeekCalendarComponent, AppWeekCalendarItem, AppWeekCalendarSelectEvent } from '@core/components/app-week-calendar/app-week-calendar.component';
import { AppSmallCalendarComponent } from '@core/components/app-small-calendar/app-small-calendar.component';
import { EntryEditDialog } from 'modules/time/dialogs/entry-edit/entry-edit.component';
import { AppDialogService } from '@core/services/app-dialog.service';
import timeModule from 'modules/time/time.module';
import { EntryEdit, EntrySearchItem, EntryService } from 'modules/time/services/entry.service';
import { AppCalendarService } from '@core/services/app-calendar.service';
import { AppConfirmService } from '@core/services/app-confirm.service';
import { AppMessageService } from '@core/services/app-message.service';

@Component({
    standalone: true,
    imports: [
        AppPage, 
        AppWeekCalendarComponent, 
        AppDate, 
        AppSmallCalendarComponent,
        EntryEditDialog
    ],
    selector: 'calendar',
    templateUrl: 'calendar.component.html'
})
export class CalendarPage implements OnInit {
    constructor(
        private appDialogService: AppDialogService, 
        private appMessageService: AppMessageService,
        private appCalendarService: AppCalendarService,
        private appConfirmService: AppConfirmService,
        private entryService: EntryService) { }

    ngOnInit() { 
        this.refresh();
    }

    date = new Date();
    loading = false;

    items: AppWeekCalendarItem[] = [];

    onSelect(e: AppWeekCalendarSelectEvent) {
        this.appDialogService.open(timeModule.dialogs.EntryEditDialog, {
            id: 0,
            date: e.date,
            timeFrom: e.timeFrom,
            timeTo: e.timeTo,
            description: '',
            activityId: null
        } as EntryEdit, {
            isEdit: false
        });
    }

    onEdit(item: AppWeekCalendarItem) {
        let entry = item.data as EntrySearchItem;
        this.appDialogService.open(timeModule.dialogs.EntryEditDialog, {
            id: item.id,
            date: item.date,
            timeFrom: item.timeFrom,
            timeTo: item.timeTo,
            description: entry.description,
            activityId: entry.activityId
        } as EntryEdit);
    }

    onDateChange(date: Date) {
        this.date = date;
        this.refresh();
    }

    async refresh() {
        this.loading = true;
        let dateFrom = this.appCalendarService.getWeekStart(this.date);
        let dateTo = this.appCalendarService.getWeekEnd(this.date);

        let result = await this.entryService.search({
            dateFrom: dateFrom.toJSON().substring(0, 10),
            dateTo: dateTo.toJSON().substring(0, 10),
            offset: 0,
            rows: 1000
        });

        this.items = result.rows.map(x => ({
            id: x.id,
            date: this.appCalendarService.dateOnly(x.dateFrom),
            timeFrom: this.appCalendarService.timeOnly(x.dateFrom),
            timeTo: this.appCalendarService.timeOnly(x.dateTo),
            color: x.activityColor,
            data: x,
            icon: x.activityIcon,
            line1: x.activityName,
            line2: x.description
        }));

        this.loading = false;
    }

    async onRemove(item: AppWeekCalendarItem) {
        await this.appConfirmService.show('time.msg.entryDeleteConfirmation', { name: item.line1 });

        try {
            item.loading = true;
            await this.entryService.remove(item.id);
            this.appMessageService.success('time.msg.entryDeleteSuccess')
            this.refresh();
        }
        catch (err) {
            this.appMessageService.handleError(err)
        }
        finally {
            item.loading = false;
        }
    }
}
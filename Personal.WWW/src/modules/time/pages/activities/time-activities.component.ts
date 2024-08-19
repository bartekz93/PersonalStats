import { Component } from '@angular/core';
import { AppSearchPageBase } from '@core/base/app-search-page.base';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';
import { AppFilterPanel } from '@core/components/app-filter-panel/app-filter-panel.component';
import { AppListEditColumn } from '@core/components/app-list/app-list-edit-column.component';
import { AppList, AppListColumnDefinition } from '@core/components/app-list/app-list.component';
import { AppPage } from '@core/components/app-page/app-page.component';
import { AppText } from '@core/controls/app-text.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { AppConfirmService } from '@core/services/app-confirm.service';
import { AppDialogService } from '@core/services/app-dialog.service';
import { AppMessageService } from '@core/services/app-message.service';
import { TimeActivityEditDialog } from 'modules/time/dialogs/activity-edit/activity-edit.component';
import { ActivitySearchItem, ActivityService } from 'modules/time/services/activity.service';
import timeModule from 'modules/time/time.module';

@Component({
    standalone: true,
    imports: [
        AppPage,
        AppButtonComponent,
        AppFilterPanel,
        AppText,
        AppList,
        AppListEditColumn,
        AppCircleLabelComponent,
        TimeActivityEditDialog,
        AppTemplateDirective
    ],
    selector: 'time-activities',
    templateUrl: 'time-activities.component.html'
})

export class TimeActivitiesPage extends AppSearchPageBase<ActivitySearchItem> {

    constructor(
        private activityService: ActivityService, 
        private appConfirmService: AppConfirmService,
        private appMessageService: AppMessageService,
        private appDialogService: AppDialogService) {
        super(timeModule.lists.ActivitiesList) 
    }

    deletingId = 0;

    override getResult(criteria: any) {
        return this.activityService.search(criteria);
    }

    override getColumns(): AppListColumnDefinition<ActivitySearchItem>[] {
        return [
            { name: 'name', label: 'time.name' },
            { name: 'actions', label: '', width: '100px' },
            
        ];
    }

    override getDefaultFilters () {
        return {
            name: ''
        };
    }

    showEditDialog(item?: ActivitySearchItem) {
        this.appDialogService.open(timeModule.dialogs.ActivityEditDialog, item)
    }

    async showDeleteDialog(item: ActivitySearchItem) {
        await this.appConfirmService.show('time.msg.activityDeleteConfirmation', { name: item.name });

        try {
            this.deletingId = item.id;
            await this.activityService.remove(item.id);
            this.appMessageService.success('time.msg.activityDeleteSuccess', { name: item.name })
            this.search();
        }
        catch (err) {
            this.appMessageService.handleError(err)
        }
        finally {
            this.deletingId = 0;
        }
    }
}
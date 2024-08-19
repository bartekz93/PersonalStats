import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditDialogBase } from '@core/base/app-edit-dialog.base';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppDialogComponent } from '@core/components/app-dialog/app-dialog.component';
import { AppFormComponent } from '@core/components/app-form/app-form.component';
import { AppColorSelect } from '@core/controls/app-color-select.component';
import { AppIconSelect } from '@core/controls/app-icon-select.component';
import { AppText } from '@core/controls/app-text.component';
import { AppDialogService } from '@core/services/app-dialog.service';
import { AppMessageService } from '@core/services/app-message.service';
import { ActivityEdit, ActivityService } from 'modules/time/services/activity.service';
import timeModule from 'modules/time/time.module';

@Component({
    standalone: true,
    imports: [
        AppDialogComponent,
        AppFormComponent,
        AppButtonComponent,
        AppColorSelect,
        AppIconSelect,
        AppText
    ],
    selector: 'activity-dialog',
    templateUrl: 'activity-edit.component.html'
})

export class TimeActivityEditDialog extends EditDialogBase<ActivityEdit> {
    constructor(appDialogService: AppDialogService, appMessageService: AppMessageService, private activityService: ActivityService) { 
        super(timeModule.dialogs.ActivityEditDialog, appDialogService, appMessageService);
    }

    @Output() onSave = new EventEmitter();

    override getFormGroup(): FormGroup<any> {
        return new FormGroup({
            id: new FormControl('', []),
            name: new FormControl('', [Validators.required]),
            color: new FormControl('', [Validators.required]),
            icon: new FormControl('', [Validators.required])
        })
    }

    override getDefaultValues() {
        return {
            id: 0,
            color: '#ff0000',
            icon: 'pi pi-sun',
            name: ''
        }
    }

    override async onEdit(edit: ActivityEdit) {
        await this.activityService.edit(edit);
        this.appMessageService.success('time.msg.activityEditSuccess')
        this.onSave.emit();
    }

    override async onCreate(edit: ActivityEdit) {
        await this.activityService.create(edit);
        this.appMessageService.success('time.msg.activityCreateSuccess')
        this.onSave.emit();
    }
}
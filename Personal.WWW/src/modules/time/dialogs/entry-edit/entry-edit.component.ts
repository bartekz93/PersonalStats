import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditDialogBase } from '@core/base/app-edit-dialog.base';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppDialogComponent } from '@core/components/app-dialog/app-dialog.component';
import { AppFormComponent } from '@core/components/app-form/app-form.component';
import { AppDate } from '@core/controls/app-date.component';
import { AppTextarea } from '@core/controls/app-textarea.component';
import { AppTime } from '@core/controls/app-time.component';
import { AppDialogService } from '@core/services/app-dialog.service';
import { AppMessageService } from '@core/services/app-message.service';
import { ActivitySelectComponent } from 'modules/time/controls/activity-select.component';
import { EntryEdit, EntryService } from 'modules/time/services/entry.service';
import timeModule from 'modules/time/time.module';

@Component({
    standalone: true,
    imports: [
        AppDialogComponent,
        AppFormComponent,
        AppButtonComponent,
        AppTextarea,
        AppDate,
        AppTime,
        ActivitySelectComponent
    ],
    selector: 'entry-dialog',
    templateUrl: 'entry-edit.component.html'
})

export class EntryEditDialog extends EditDialogBase<EntryEdit> {
    
    constructor(appDialogService: AppDialogService, appMessageService: AppMessageService, private entryService: EntryService) { 
        super(timeModule.dialogs.EntryEditDialog, appDialogService, appMessageService);
    }

    @Output() onSave = new EventEmitter();

    ngOnInit() { }

    override getDefaultValues() {
        return {
            id: 0,
            activityId: null,
            date: '',
            timeFrom: '',
            timeTo: '',
            description: ''
        }
    }
    override getFormGroup(): FormGroup<any> {
        return new FormGroup({
            id: new FormControl('', []),
            activityId: new FormControl('', [Validators.required]),
            date: new FormControl('', [Validators.required]),
            timeFrom: new FormControl('', [Validators.required]),
            timeTo: new FormControl('', [Validators.required]),
            description: new FormControl('', [])
        })
    }

    override async onEdit(edit: EntryEdit): Promise<any> {
        await this.entryService.edit(edit);
        this.appMessageService.success('time.msg.entryEditSuccess')
        this.onSave.emit();
    }

    override async onCreate(edit: EntryEdit): Promise<any> {
        await this.entryService.create(edit);
        this.appMessageService.success('time.msg.entryCreateSuccess')
        this.onSave.emit();
    }
}
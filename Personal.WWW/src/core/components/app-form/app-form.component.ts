import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDynamicComponent } from '../app-dynamic/app-dynamic.component';
import { AppForm } from '../../models/app-form';
import { TranslateModule } from '@ngx-translate/core';
import { AppActionComponent } from '../app-action/app-action.component';
import { AppActionContext } from '../../models/app-page-action.model';


@Component({
    standalone: true,
    imports: [ FormsModule, CommonModule, ReactiveFormsModule, AppDynamicComponent, TranslateModule, AppActionComponent ],
    selector: 'app-form',
    templateUrl: 'app-form.component.html',
    styleUrl: 'app-form.component.scss'
})
export class AppFormComponent implements OnInit {
    constructor() { }

    @Input() form!: AppForm;
    @Input() horizontal?: boolean;
    //@Output() onSubmit: EventEmitter<any> = new EventEmitter;

    formGroup!: FormGroup;

    ngOnChanges() {
        if (this.formGroup) {
            this.form.controls.forEach(c => {
                let control = this.formGroup.get(c.field);
                control?.setValue(c.value)
                control?.markAsUntouched();
            });
        }
    }

    ngOnInit() { 
        this.formGroup = new FormGroup({});
        this.form.controls.forEach(c => {
            c.fc = new FormControl(c.value, c.rules);
            this.formGroup.addControl(c.field, c.fc);
        });
        if (this.form.rules) {
            this.formGroup.addValidators(this.form.rules);
        }
    }

    getFiltersStyle() {
        return {
            display: 'flex',
            flexDirection: this.horizontal ? 'row' : 'column',
            alignItems: this.horizontal ? 'center' : 'center',
            gap: '10px'
        }
    }

    getFormStyle() {
        return {
        }
    }

    getActionsStyle() {
        return {
            justifyContent: this.horizontal ? 'flex-end' : 'center'
        }
    }

    submit() {
        Object.keys(this.formGroup.controls).forEach(field => {
            let c = this.formGroup.get(field);
            c?.markAsTouched({ onlySelf: true });
        });

        if (this.formGroup.valid) {
            let submitAction = this.form.actions.filter(a => a.submit)[0];

            let actionCtx = new AppActionContext(submitAction);

            if (submitAction.onClick) submitAction.onClick(actionCtx, this.formGroup.value);

            // this.onSubmit.emit({
            //     value: this.formGroup.value,
            //     ctx: actionCtx
            // });
        }
    }

    keys(obj: Object) {
        return Object.keys(obj);
    }
}
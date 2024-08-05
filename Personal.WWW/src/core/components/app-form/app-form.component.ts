import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDynamicComponent } from '../app-dynamic/app-dynamic.component';
import { AppForm, AppFormControl, AppFormSubmit } from '../../models/app-form';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
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
    @Output() onSubmit: EventEmitter<any> = new EventEmitter;

    formGroup!: FormGroup;

    ngOnInit() { 
        this.formGroup = new FormGroup({});
        this.form.controls.forEach(c => {
            let control = new FormControl(c.value, c.rules);
            this.formGroup.addControl(c.field, control);
        });
        if (this.form.rules) {
            this.formGroup.addValidators(this.form.rules);
        }
        console.log(this.formGroup)
    }

    submit() {
        Object.keys(this.formGroup.controls).forEach(field => {
            let c = this.formGroup.get(field);
            c?.markAsTouched({ onlySelf: true });
        });

        if (this.formGroup.valid) {
            let submitAction = this.form.actions.filter(a => a.submit)[0];

            let actionCtx = new AppActionContext(submitAction);
            this.onSubmit.emit({
                value: this.formGroup.value,
                ctx: actionCtx
            });
        }
    }

    keys(obj: Object) {
        return Object.keys(obj);
    }
}
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';

@Component({
    standalone: true,
    imports: [CalendarModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-date',
    styles: `
        :host ::ng-deep input {
            width: 100%
        }
    `,
    template: `
        <app-base-control>
            <p-calendar 
                appendTo="body"
                [style]="{width: '100%'}"
                [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" 
                dateFormat="yy-mm-dd" 
                [ngModel]="fc?.value" 
                (ngModelChange)="update(format($event))" 
                [iconDisplay]="'input'" 
                [showIcon]="true" 
                [placeholder]="label | translate" 
            />
            <ng-content></ng-content>
        </app-base-control>`
})

export class AppDate extends AppBaseControl {
    constructor() {
        super()
    }

    format(date: Date) {
        console.log(date, date.toISOString().substring(0, 10));
        return date.toISOString().substring(0, 10);
    }
}
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';

@Component({
    standalone: true,
    imports: [CalendarModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-time',
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
                [timeOnly]="true"
                [placeholder]="label | translate" 
            >
                <ng-template pTemplate="inputicon" let-clickCallBack="clickCallBack">
                    <i class="pi pi-clock pointer-events-none" (click)="clickCallBack($event)"></i>
                </ng-template>
            </p-calendar>
            <ng-content></ng-content>
        </app-base-control>`
})

export class AppTime extends AppBaseControl {
    constructor() {
        super()
    }

    format(date: string) {
        return new Date(date).toLocaleTimeString().substring(0, 5);
    }
}
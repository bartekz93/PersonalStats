import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';

@Component({
    standalone: true,
    imports: [CalendarModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-date',
    template: `
        <app-base-control>
            <p-calendar 
                [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" 
                dateFormat="yy-mm-dd" 
                [ngModel]="fc?.value" 
                (ngModelChange)="update($event)" 
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
}
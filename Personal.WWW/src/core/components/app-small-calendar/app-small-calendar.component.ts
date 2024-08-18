import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
    standalone: true,
    imports: [CalendarModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule ],
    selector: 'app-small-calendar',
    styles: `
        :host ::ng-deep input {
            width: 100%
        }

        :host ::ng-deep .p-datepicker table td > span { 
            width: auto;
            height: auto;
         }
    `,
    template: `
        <p-calendar 
            [style]="{width: '100%'}"
            [inline]="true"
            dateFormat="yy-mm-dd" 
            [ngModel]="value" 
            (ngModelChange)="onChange.emit($event)" 
            [iconDisplay]="'input'" 
            [showIcon]="true"
        />`
})

export class AppSmallCalendarComponent {
    @Input() value?: Date;
    @Output() onChange = new EventEmitter<any>();
}
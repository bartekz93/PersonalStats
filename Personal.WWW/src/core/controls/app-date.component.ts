import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
    standalone: true,
    imports: [CalendarModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule],
    selector: 'app-date',
    template: `<p-calendar 
        [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" 
        dateFormat="yy-mm-dd" 
        [ngModel]="fc.value" 
        (ngModelChange)="update($event)" 
        [iconDisplay]="'input'" 
        [showIcon]="true" 
        [placeholder]="label | translate" 
    />`
})

export class AppDate {
    constructor() { }

    @Input() fc!: FormControl;
    @Input() label!: string;

    isInvalid() {
        return this.fc.invalid && this.fc.touched;
    }

    update(val: string): void {
        this.fc.markAsTouched();
        this.fc.setValue(val);
    }
}
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppDynamicComponent } from '../app-dynamic/app-dynamic.component';
import { TranslateModule } from '@ngx-translate/core';

export interface AppFilterPanelDefinition<T> {
    type: string;
    label: string;
    field: string;
    component?: any;
}

@Component({
    standalone: true,
    selector: 'app-filter-panel',
    templateUrl: 'app-filter-panel.component.html',
    imports: [ButtonModule, CardModule, CalendarModule, CommonModule, FormsModule, InputNumberModule, AppDynamicComponent, TranslateModule]
})

export class AppFilterPanel<T> implements OnInit {
    constructor() { }

    @Input() filters!: AppFilterPanelDefinition<T>[];
    @Input() value!: any;

    @Output() onSearch: EventEmitter<void> = new EventEmitter();
    @Output() onClear: EventEmitter<void> = new EventEmitter();

    ngOnInit() { }

    getValue(field: string) {
        return this.value[field];
    }

    setValue(field: string, v: any) {
        this.value[field] = v;
    }

    clear() {
        this.onClear.emit();
    }
}
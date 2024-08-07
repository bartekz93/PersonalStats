import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { AppButtonComponent } from '../app-button/app-button.component';

@Component({
    standalone: true,
    selector: 'app-filter-panel',
    templateUrl: 'app-filter-panel.component.html',
    imports: [CardModule, CommonModule, FormsModule, TranslateModule, AppButtonComponent]
})

export class AppFilterPanel<T> implements OnInit {
    constructor() { }

    @Input() loading = false;

    @Output() onSearch: EventEmitter<void> = new EventEmitter();
    @Output() onClear: EventEmitter<void> = new EventEmitter();

    ngOnInit() { }

    search() {
        this.onSearch.emit();
    }

    clear() {
        this.onClear.emit()
    }
}
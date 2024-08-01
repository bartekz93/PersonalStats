import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
    standalone: true,
    selector: 'app-filter-panel',
    templateUrl: 'app-filter-panel.component.html',
    imports: [ButtonModule, CardModule]
})

export class AppFilterPanel implements OnInit {
    constructor() { }

    @Output() onSearch: EventEmitter<void> = new EventEmitter();
    @Output() onClear: EventEmitter<void> = new EventEmitter();

    ngOnInit() { }
}
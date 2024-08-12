import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';

@Component({
    standalone: true,
    imports: [ AppButtonComponent ],
    selector: 'app-list-edit-column',
    template: `
        <div style="display: flex; gap: 10px">
            <app-button tooltip="app.edit" [round]="true" icon="pi pi-pencil" [flat]="true" (onClick)="onEdit.emit()" />
            <app-button tooltip="app.delete" [round]="true" icon="pi pi-trash" [flat]="true" (onClick)="onDelete.emit()" [loading]="deletingId==id" />
        </div>
    `
})

export class AppListEditColumn implements OnInit {
    constructor() {
    }

    @Input() deletingId = 0;
    @Input() id = 0;

    @Output() onEdit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();

    ngOnInit() { }
}
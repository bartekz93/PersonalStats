import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AppDialogService } from '../../services/app-dialog.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [DialogModule, TranslateModule],
    selector: 'app-dialog',
    template: `
        <p-dialog [draggable]="false" [header]="header | translate" [modal]="true" [visible]="visible()" (visibleChange)="close()" >
            <ng-content></ng-content>
        </p-dialog>`
})

export class AppDialogComponent implements OnInit {
    constructor(private appDialogService: AppDialogService) { }

    @Input() header!: string;
    @Input() code!: string;

    @Output() open = new EventEmitter<any>();

    ngOnInit() { 
        this.appDialogService.register(this.code, (data) => {
            this.open.emit(data);
        })
    }

    visible() {
        return this.appDialogService.isVisible(this.code);
    }

    close() {
        this.appDialogService.close(this.code);
    }
}
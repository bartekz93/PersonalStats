import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AppDialogService } from '../../services/app-dialog.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [DialogModule, TranslateModule],
    selector: 'app-dialog',
    template: `
        <p-dialog [style]="style" [draggable]="false" [header]="header | translate" [modal]="true" [visible]="visible()" (visibleChange)="close()" >
            <ng-content></ng-content>
        </p-dialog>`
})

export class AppDialogComponent implements OnInit {
    constructor(private appDialogService: AppDialogService) { }

    @Input() header!: string;
    @Input() code!: string;
    @Input() width!: string;
    @Input() height!: string;
    @Input() style!: any;

    @Output() open = new EventEmitter<any>();

    ngOnInit() { 
        this.appDialogService.register(this.code, (data, options) => {
            this.open.emit({
                data: data,
                options: options
            });
        })
    }

    visible() {
        return this.appDialogService.isVisible(this.code);
    }

    close() {
        this.appDialogService.close(this.code);
    }
}
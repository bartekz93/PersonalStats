import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AppDialogService } from '../../services/app-dialog.service';
import { AppForm } from '../../models/app-form';
import { AppFormComponent } from '../app-form/app-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [DialogModule, AppFormComponent, TranslateModule],
    selector: 'app-dialog',
    template: `<p-dialog [header]="title | translate" [modal]="true" [visible]="visible()" (visibleChange)="close()" >
        @if (form) {
            <div class="mt-2">
                <app-form [form]="form" [horizontal]="true"/>
            </div>
        }
        <ng-content></ng-content>
    </p-dialog>`
})

export class AppDialogComponent implements OnInit {
    constructor(private appDialogService: AppDialogService) { }

    @Input() title!: string;
    @Input() code!: string;
    @Input() form?: AppForm;

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
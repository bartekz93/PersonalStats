import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppDialogService } from '@core/services/app-dialog.service';
import { AppIconBrowserComponent } from '@core/components/app-icon-browser/app-icon-browser.component';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';

@Component({
    standalone: true,
    imports: [FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent, AppButtonComponent, AppIconBrowserComponent, AppCircleLabelComponent ],
    selector: 'app-icon-select',
    template: `
        <app-base-control>
            <app-icon-browser (onSelect)="select($event)"/>
            <app-circle-label [icon]="fc?.value" [color]="color" (click)="open()" [clickable]="true"/>
        </app-base-control>
    `
})

export class AppIconSelect extends AppBaseControl {
    constructor(private dialogService: AppDialogService) {
        super()
    }

    @Input() color = 'white'

    open() {
        this.dialogService.open('AppIconBrowser', {});
    }

    select(icon: string) {
        this.update(icon);
        this.dialogService.close('AppIconBrowser');
    }
}
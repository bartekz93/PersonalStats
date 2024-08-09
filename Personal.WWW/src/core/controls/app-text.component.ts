import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';

@Component({
    standalone: true,
    imports: [InputTextModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-text',
    template: `
        <app-base-control>
            <input [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" type="text" [ngModel]="fc?.value" (ngModelChange)="update($event)" pInputText [placeholder]="label | translate" />
            <ng-content></ng-content>
        <app-base-control>`
})
export class AppText extends AppBaseControl {
    constructor() {
        super()
    }
}
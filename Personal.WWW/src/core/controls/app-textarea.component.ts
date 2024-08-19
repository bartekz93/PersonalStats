import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
    standalone: true,
    imports: [InputTextareaModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-textarea',
    template: `
        <app-base-control>
            <textarea 
                [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }"
                rows="5"
                cols="30" 
                pInputTextarea
                [placeholder]="label | translate"
                [ngModel]="fc?.value" 
                (ngModelChange)="update($event)"
            >
            </textarea>
            <ng-content></ng-content>
        <app-base-control>`
})
export class AppTextarea extends AppBaseControl {
    constructor() {
        super()
    }
}
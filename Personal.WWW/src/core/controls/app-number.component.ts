import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';

@Component({
    standalone: true,
    imports: [InputNumberModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-number',
    styles: `
        :host ::ng-deep input {
            width: 100%
        }
    `,
    template: `
        <app-base-control>
            <p-inputNumber
                [style]="{ minWidth: '100%' }"
                [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" 
                [ngModel]="fc?.value" 
                (ngModelChange)="update($event)" 
                [showClear]="true" 
                mode="decimal"
                [maxFractionDigits]="2"
                [placeholder]="label | translate" 
            />
            <ng-content></ng-content>
        </app-base-control>
    `
})

export class AppNumber extends AppBaseControl {
    constructor() {
        super()
    }
}
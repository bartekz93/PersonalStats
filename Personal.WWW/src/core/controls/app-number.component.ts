import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    standalone: true,
    imports: [InputNumberModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule],
    selector: 'app-number',
    template: `<p-inputNumber
        [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" 
        [ngModel]="fc.value" 
        (ngModelChange)="update($event)" 
        [showClear]="true" 
        mode="decimal"
        [maxFractionDigits]="2"
        [placeholder]="label | translate" 
    />`
})

export class AppNumber {
    constructor() { }

    @Input() fc!: FormControl;
    @Input() label!: string;

    isInvalid() {
        return this.fc.invalid && this.fc.touched;
    }

    update(val: string): void {
        this.fc.markAsTouched();
        this.fc.setValue(val);
    }
}
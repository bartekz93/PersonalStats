import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    standalone: true,
    imports: [InputTextModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule],
    selector: 'app-text',
    template: `<input [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" type="text" [ngModel]="value" (ngModelChange)="update($event)" pInputText [placeholder]="label | translate" />`
})

export class AppText {
    constructor() { }

    value: string = '';

    @Input() fc!: FormControl;
    @Input() label!: string;

    isInvalid() {
        return this.fc.invalid && this.fc.touched;
    }

    update(val: string): void {
        this.value = val;
        this.fc.markAsTouched();
        this.fc.setValue(val);
    }
}
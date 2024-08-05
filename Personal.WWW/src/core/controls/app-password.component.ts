import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordModule } from 'primeng/password';

@Component({
    standalone: true,
    imports: [PasswordModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule],
    selector: 'app-password',
    template: `<p-password [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" [feedback]="false" [placeholder]="label | translate" [ngModel]="value" (ngModelChange)="update($event)" />`
})

export class AppPassword {
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
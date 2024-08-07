import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    standalone: true,
    imports: [InputTextModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule],
    selector: 'app-text',
    template: `<input [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" type="text" [ngModel]="fc.value" (ngModelChange)="update($event)" pInputText [placeholder]="label | translate" />`
})

export class AppText {
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
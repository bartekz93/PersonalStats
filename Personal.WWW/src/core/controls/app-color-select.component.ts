import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
    standalone: true,
    imports: [ColorPickerModule, FormsModule, ReactiveFormsModule, CommonModule],
    selector: 'app-color-select',
    template: `<p-colorPicker appendTo="body" [ngModel]="fc.value" (ngModelChange)="update($event)" />`
})

export class AppColorSelect {
    constructor() { }

    @Input() fc!: FormControl;

    isInvalid() {
        return this.fc.invalid && this.fc.touched;
    }

    update(val: string): void {
        this.fc.markAsTouched();
        this.fc.setValue(val);
    }
}
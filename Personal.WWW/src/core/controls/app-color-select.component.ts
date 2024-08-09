import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';

@Component({
    standalone: true,
    imports: [ColorPickerModule, FormsModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-color-select',
    template: `
        <app-base-control>
            <p-colorPicker appendTo="body" [ngModel]="fc?.value" (ngModelChange)="update($event)" />
            <ng-content></ng-content>
        </app-base-control>
    `
})

export class AppColorSelect extends AppBaseControl {
    constructor() {
        super()
    }
}
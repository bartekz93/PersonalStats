import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    standalone: true,
    imports: [ColorPickerModule, FormsModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent, InputTextModule],
    selector: 'app-color-select',
    template: `
        <app-base-control>
            <div style="display: flex; align-items: center; gap: 10px">
                <p-colorPicker appendTo="body" [ngModel]="fc?.value" (ngModelChange)="update($event)" />
                <input [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" type="text" [ngModel]="fc?.value" (ngModelChange)="update($event)" pInputText [style]="{ width: '150px'}"/>
            </div>
            <ng-content></ng-content>
        </app-base-control>
    `
})

export class AppColorSelect extends AppBaseControl {
    constructor() {
        super()
    }
}
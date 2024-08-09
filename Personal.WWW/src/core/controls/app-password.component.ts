import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordModule } from 'primeng/password';
import { AppBaseControl, AppBaseControlComponent } from './app-base-control.component';

@Component({
    standalone: true,
    imports: [PasswordModule, FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, AppBaseControlComponent],
    selector: 'app-password',
    template: `
        <app-base-control>
            <p-password [ngClass]="{ 'ng-invalid': isInvalid(), 'ng-dirty': isInvalid() }" [feedback]="false" [placeholder]="label | translate" [ngModel]="fc?.value" (ngModelChange)="update($event)" />
            <ng-content></ng-content>
        <app-base-control>`
})
export class AppPassword extends AppBaseControl {
    constructor() {
        super()
    }
}
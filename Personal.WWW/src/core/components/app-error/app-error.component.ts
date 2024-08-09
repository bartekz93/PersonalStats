import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [ TranslateModule ],
    selector: 'app-error',
    template: `
        @if (shouldShow()) {
            <div class="text-justify">
                <small class="text-red-500">{{msg  | translate }}</small>
            </div>
        }`
})

export class AppError implements OnInit {
    constructor() { }

    @Input() fc!: AbstractControl;
    @Input() rule = ''
    @Input() msg = ''

    ngOnInit() { }

    shouldShow() {
        if (this.fc) {
            let errors = this.fc?.errors;
            return this.fc.invalid && this.fc.touched && errors && errors[this.rule];
        }
        return false;
    }
}
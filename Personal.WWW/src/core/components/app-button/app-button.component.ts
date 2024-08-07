import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    imports: [ TranslateModule, ButtonModule ],
    selector: 'app-button',
    template: `
        <p-button 
            (onClick)="click()" 
            [type]="submit ? 'submit' : 'button'" 
            [loading]="loading" 
            [icon]="icon" 
            size="small"
            [outlined]="flat"
            [severity]="secondary ? 'secondary' : 'primary'"
            [label]="label | translate" />
        `
})

export class AppButtonComponent implements OnInit {
    constructor() { }

    @Input() loading = false;
    @Input() icon = '';
    @Input() label = '';
    @Input() secondary = false;
    @Input() flat = false;
    @Input() submit = false;

    @Output() onClick = new EventEmitter();

    ngOnInit() { }

    click() {
        this.onClick.emit()
    }
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Tooltip, TooltipModule } from 'primeng/tooltip';

@Component({
    standalone: true,
    imports: [ TranslateModule, ButtonModule, TooltipModule ],
    selector: 'app-button',
    template: `
        <p-button 
            [style]="round ? { width: '40px', height: '40px' } : {}"
            (onClick)="click($event)" 
            [type]="submit ? 'submit' : 'button'" 
            [loading]="loading" 
            [icon]="icon" 
            [rounded]="round"
            size="small"
            [text]="flat"
            [pTooltip]="tooltip | translate" 
            tooltipPosition="bottom" 
            showDelay="500" 
            [severity]="secondary ? 'secondary' : 'primary'"
            [label]="label | translate" />
        `
})

export class AppButtonComponent implements OnInit {
    constructor() { }

    @Input() tooltip = '';
    @Input() loading = false;
    @Input() icon = '';
    @Input() label = '';
    @Input() secondary = false;
    @Input() flat = false;
    @Input() round = false;
    @Input() submit = false;

    @Output() onClick = new EventEmitter();

    ngOnInit() { }

    click(ev: any) {
        this.onClick.emit(ev)
    }
}
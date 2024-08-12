import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-circle-label',
    template: `
        <div style="display: flex; gap: 10px; align-items: center">
            <div [ngStyle]="getItemStyle()">
                @if (hasIcon()) {
                    <i [ngStyle]="getIconStyle()" [class]="icon"></i>
                }
            </div>
            {{label}}
        </div>`
})

export class AppCircleLabelComponent implements OnInit {
    constructor() { }

    private circleScale = 16;
    private iconScale = 8;

    @Input() color = '';
    @Input() label = '';
    @Input() icon = '';
    @Input() iconColor = 'white';
    @Input() size = 2;

    ngOnInit() { }

    hasIcon() {
        return this.icon !== '';
    }

    getIconStyle() {
        return {
            fontSize: `${this.size*this.iconScale}px`,
            color: this.iconColor
        }
    }

    getItemStyle() {
        return {
            width: `${this.size*this.circleScale}px`,
            height: `${this.size*this.circleScale}px`,
            fontSize: `${this.size*this.circleScale}px`,
            backgroundColor: this.color,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}
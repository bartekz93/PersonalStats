import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-circle-label',
    template: `
        <div [ngStyle]="getBodyStyle()">
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
    @Input() clickable = false;
    @Input() iconColor = 'white';
    @Input() size = 2;

    ngOnInit() { }

    hasIcon() {
        return this.icon !== '';
    }

    getBodyStyle() {
        return {
            display: 'flex',
            gap: '10px', 
            alignItems: 'center',
            cursor: this.clickable ? 'pointer' : 'normal',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
            textOverflow: 'ellipsis'
        }
    }

    getIconStyle() {
        return {
            fontSize: `${this.size*this.iconScale}px`,
            color: this.iconColor
        }
    }

    getItemStyle() {
        return {
            minWidth: `${this.size*this.circleScale}px`,
            minHeight: `${this.size*this.circleScale}px`,
            fontSize: `${this.size*this.circleScale}px`,
            backgroundColor: this.color || 'var(--primary-color)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppDashboardBox } from './app-dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [AppButtonComponent, CommonModule],
    selector: 'app-dashboard-box',
    templateUrl: 'app-dashboard-box.component.html',
    styleUrl: 'app-dashboard-box.component.scss',
})

export class AppDashboardBoxComponent implements OnInit {
    constructor() { }

    @ViewChild('body') body?: ElementRef<HTMLInputElement>;

    @Input() edit = false;

    @Input() box: AppDashboardBox = {};

    isResizing = false;

    ngOnInit() { }

    split(type: string) {
        this.box.type = type;
        this.box.size1 = 0.5;
        this.box.size2 = 0.5;
        this.box.box1 = {
            type: 'N'
        },
        this.box.box2 = {
            type: 'N'
        }
    }

    fill() {
        this.box.type = 'F';
    }

    grabBorder() {
        this.isResizing = true;
    }

    onMouseUp() {
        this.isResizing = false;
    }

    onMouseMove(e: MouseEvent) {
        e.preventDefault();
        if (!this.isResizing) return;

        let body = this.body?.nativeElement;
        if (!body) return;

        let rect = body.getBoundingClientRect();
        let dim;
        if (this.box.type == 'H') {
            dim = e.clientX - rect.left;
            this.box.size1 = dim / body.clientWidth;
            this.box.size2 = (body.clientWidth*(1-this.box.size1)-5)/body.clientWidth;
        }
        else {
            dim = e.clientY - rect.top;
            this.box.size1 = dim / body.clientHeight;
            this.box.size2 = (body.clientHeight*(1-this.box.size1)-5)/body.clientHeight;
        }
    }

    canJoin() {
        return this.box.type !== 'N' && this.box.box1?.type == 'N' && this.box.box2?.type == 'N';
    }

    join() {
        this.box.type = 'N';
    }

    getStyle() {
        return {
            display: 'flex',
            flexDirection: this.box.type == 'H' ? 'row' : 'column',
            width: '100%',
            height: '100%',
        }
    }

    getBorderStyle() {
        let w = this.box.type == 'H' ? '10px' : 'auto';
        let h = this.box.type == 'V' ? '10px' : 'auto';
        return {
            minWidth: w,
            maxWidth: w,
            minHeight: h,
            maxHeight: h,
            cursor: this.box.type == 'H' ? 'ew-resize' : 'ns-resize'
        }
    }
}
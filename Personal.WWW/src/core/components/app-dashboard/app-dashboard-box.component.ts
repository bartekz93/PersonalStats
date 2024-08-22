import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppDashboardBox } from './app-dashboard.component';
import { CommonModule } from '@angular/common';
import { AppDynamicComponent } from "../app-dynamic/app-dynamic.component";
import { AppDashboardService, DashboardTileDesc } from '@core/services/app-dashboard.service';
import { AppCardComponent } from '../app-card/app-card.component';
import { AppDashboardTileComponent } from './app-dashboard-tile.component';
import { AppDialogService } from '@core/services/app-dialog.service';
import { AppDashboardTileBase } from './app-dashboard-tile.base';

@Component({
    standalone: true,
    imports: [AppButtonComponent, CommonModule, AppDynamicComponent, AppDashboardTileComponent],
    selector: 'app-dashboard-box',
    templateUrl: 'app-dashboard-box.component.html',
    styleUrl: 'app-dashboard-box.component.scss',
})

export class AppDashboardBoxComponent implements OnInit {
    constructor(private dashboardService: AppDashboardService, private dialogService: AppDialogService) { }

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
        this.dialogService.open('app-dashboard-tile-browser', {}).then((tile: DashboardTileDesc) => {
            this.box.type = 'F';
            this.box.tile = tile.strongName;
        })
    }

    clear() {
        this.box.type = 'N';
        this.box.tile = ''
    }

    getTileDesc() {
        if (this.box.type == 'F' && this.box.tile) {
            let tile = this.dashboardService.get(this.box.tile);
            return tile;
        }
        return null;
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

    getBoxStyle(index: number) {
        let size = ((index == 1 ? this.box.size1 : this.box.size2) || 0)*100;
        return {
            width: this.box.type == 'H' ? `${size}%` : 'auto',
            height: this.box.type == 'V' ? `${size}%` : 'auto',
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

function tile(value: unknown): unknown {
    throw new Error('Function not implemented.');
}

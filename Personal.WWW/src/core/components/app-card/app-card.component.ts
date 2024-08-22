import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'app-card',
    styles: `
        :host {
            background-color: var(--surface-card);
            box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
            border-radius: 5px;
            padding: 5px;
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 20px;
        }
        .content {
            flex: 1;
            overflow: hidden;
        }

        .actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    `,
    template: `
        <div class="header"><ng-content select="[header]"></ng-content></div>
        <div class="content"><ng-content select="[content]"></ng-content></div>
        <div class="actions">
            <ng-content select="[actionsLeft]"></ng-content>
            <ng-content select="[actions]"></ng-content>
            <ng-content select="[actionsRight]"></ng-content>
        </div>
    `
})

export class AppCardComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
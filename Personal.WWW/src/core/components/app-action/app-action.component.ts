import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AppAction, AppActionContext } from '../../models/app-page-action.model';

@Component({
    standalone: true,
    imports: [ButtonModule, TranslateModule],
    selector: 'app-action',
    templateUrl: 'app-action.component.html'
})

export class AppActionComponent implements OnInit {
    constructor() { }

    @Input() action!: AppAction;

    ngOnInit() { }

    click() {
        if (!this.action.submit) {
            let ctx = new AppActionContext(this.action);
            if (this.action.onClick) this.action.onClick(ctx);
        }
    }
}
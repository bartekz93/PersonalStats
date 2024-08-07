import { Component, Input, OnInit } from '@angular/core';
import { AppAction } from '../../models/app-page-action.model';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { AppActionComponent } from '../app-action/app-action.component';

@Component({
    standalone: true,
    imports: [ ButtonModule, TranslateModule, AppActionComponent ],
    selector: 'app-page',
    styleUrl: './app-page.component.scss',
    templateUrl: './app-page.component.html'
})

export class AppPage implements OnInit {
    constructor() { }

    @Input() withBack: boolean = true;
    @Input() title: string = '';
    @Input() actions: AppAction[] = [];

    ngOnInit(): void {
    }

    back() {
        history.back();
    }
}
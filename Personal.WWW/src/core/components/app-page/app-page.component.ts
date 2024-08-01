import { Component, Input, OnInit } from '@angular/core';
import { AppPageAction } from '../../models/app-page-action.model';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    imports: [ ButtonModule ],
    selector: 'app-page',
    styleUrl: './app-page.component.scss',
    templateUrl: './app-page.component.html'
})

export class AppPage implements OnInit {
    constructor() { }

    @Input() withBack: boolean = true;
    @Input() title: string = '';
    @Input() actions: AppPageAction[] = [];

    ngOnInit(): void {
    }

    back() {
        history.back();
    }
}
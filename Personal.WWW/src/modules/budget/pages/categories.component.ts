import { Component, OnInit } from '@angular/core';
import { AppPage } from '../../../core/components/app-page/app-page.component';

@Component({
    selector: 'categories-page',
    standalone: true,
    templateUrl: 'categories.component.html',
    imports: [AppPage]
})

export class CategoriesPage implements OnInit {
    constructor() { }

    ngOnInit() { }
}
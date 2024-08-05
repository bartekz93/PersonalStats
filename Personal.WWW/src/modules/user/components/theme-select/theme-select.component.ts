import { Component, OnInit } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [ToggleButtonModule, FormsModule, CommonModule],
    selector: 'theme-select',
    templateUrl: 'theme-select.component.html'
})

export class ThemeSelect implements OnInit {
    constructor(private themeService: ThemeService) { }

    dark: boolean = false;

    ngOnInit() { 
        this.dark = this.themeService.theme == 'dark';
    }

    change() {
        this.dark = !this.dark;
        if (this.dark) {
            this.themeService.setTheme('dark');
        } else {
            this.themeService.setTheme('light');
        }
    }
}
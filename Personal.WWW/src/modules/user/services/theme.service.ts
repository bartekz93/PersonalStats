import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ThemeService {
    constructor() { }

    theme: string = 'light';

    loadTheme() {
        let theme = localStorage.getItem('theme');
        if (theme) {
            this.setTheme(theme);
        }
    }

    setTheme(code: string) {
        this.theme = code;
        localStorage.setItem('theme', code);

        const link = document.getElementById('app-theme') as HTMLLinkElement;        
        link.href = `styles/lara-${code}-blue.css`
    }
}
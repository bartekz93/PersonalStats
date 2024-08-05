import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class LangService {
    constructor(private translateService: TranslateService) { }

    loadLang() {
        let code = localStorage.getItem('lang');
        if (code) {
            this.setLang(code);
        }
    }

    getCurrentLang() {
        return this.translateService.currentLang || this.translateService.defaultLang;
    }

    setLang(code: string) {
        this.translateService.use(code);
        localStorage.setItem('lang', code);
    }
}
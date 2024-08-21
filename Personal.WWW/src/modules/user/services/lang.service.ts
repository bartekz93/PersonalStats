import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LangService {
    constructor(private translateService: TranslateService, private config: PrimeNGConfig) { }

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

        this.updateNgPrimeTranslations();
    }

    updateNgPrimeTranslations() {
        let t1 = this.translateService.get('app.months');
        let t2 = this.translateService.get('app.monthsShort');
        let t3 = this.translateService.get('app.days');
        let t4 = this.translateService.get('app.daysShort');

        forkJoin([t1, t2, t3, t4]).subscribe(r => {
            this.config.setTranslation({
                monthNames: r[0].split('|'),
                monthNamesShort: r[1].split('|'),
                dayNames: r[2].split('|'),
                dayNamesMin: r[3].split('|'),
                dayNamesShort: r[3].split('|'),
            })
        })
    }
}
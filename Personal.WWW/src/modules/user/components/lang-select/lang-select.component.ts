
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { LangService } from '../../services/lang.service';

@Component({
    standalone: true,
    imports: [DropdownModule, CommonModule, FormsModule],
    selector: 'lang-select',
    templateUrl: 'lang-select.component.html'
})

export class LangSelect implements OnInit {
    constructor(private langService: LangService) { }

    langs: any[] | undefined;
    selected?: any;

    ngOnInit() {
        this.langs = [
            { name: 'English', code: 'en' },
            { name: 'Polski', code: 'pl' }
        ];

        this.selected = this.langs.find(x => x.code == this.langService.getCurrentLang());
     }

     change(lang: any) {
        this.selected = lang;
        this.langService.setLang(lang.code);
     }
}
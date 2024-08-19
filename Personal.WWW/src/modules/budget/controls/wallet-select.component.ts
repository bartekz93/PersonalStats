import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WalletService } from '@budget/services/wallets.service';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';
import { AppSelectComponent } from '@core/controls/app-select.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [ AppSelectComponent, AppCircleLabelComponent, AppTemplateDirective, TranslateModule ],
    selector: 'wallet-select',
    template: `
        <app-select [options]="options" [label]="label" [fc]="fc" >
            <ng-template appTemplate="item" let-item="item">
                <app-circle-label [icon]="item.icon" [color]="item.color" [label]="item.label | translate" [size]="1"/>
            </ng-template>
        </app-select>
    `
})

export class WalletSelectComponent implements OnInit {
    constructor(private walletService: WalletService) {
    }

    @Input() fc!: FormControl;
    @Input() label: string = '';

    options: any[] = [];

    async ngOnInit() {
        let wallets = await this.walletService.search({});
        this.options = wallets.rows.map(w => ({
            label: w.name,
            value: w.id,
            icon: 'pi pi-wallet',
            color: w.color
        }))
    }
}

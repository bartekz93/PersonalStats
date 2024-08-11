import { Component, OnInit }                              from '@angular/core';
import { TranslateModule }                        from '@ngx-translate/core';
import { DialogService }                          from 'primeng/dynamicdialog';
import { AppPage }                                from "@core/components/app-page/app-page.component";
import { AppButtonComponent }                     from '@core/components/app-button/app-button.component';
import { AppFilterPanel }                         from '@core/components/app-filter-panel/app-filter-panel.component';
import { AppList, AppListColumnDefinition }       from '@core/components/app-list/app-list.component';
import { AppSearchPageBase }                      from '@core/base/app-search-page.base';
import { AppText }                                from '@core/controls/app-text.component';
import { AppCurrencySelect }                      from '@core/controls/app-currency-select.component';
import { AppDialogService }                       from '@core/services/app-dialog.service';
import { WalletSearchItem, WalletService }        from '@budget/services/wallets.service'
import { WalletEditDialog }                       from '@budget/dialogs/wallet-edit/wallet-edit.component';
import { AppError } from '@core/components/app-error/app-error.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'wallets-page',
    templateUrl: 'wallets.component.html',
    standalone: true,
    imports: [TranslateModule, WalletEditDialog, AppPage, AppButtonComponent, AppFilterPanel, AppCurrencySelect, AppText, AppList, AppError, CommonModule],
    providers: [DialogService]
})

export class WalletsPage extends AppSearchPageBase<WalletSearchItem> {
    constructor(
        private walletService: WalletService, 
        private appDialogService: AppDialogService) {
        super('WalletsList')
    }

    override getResult(criteria: any) {
        return this.walletService.search(criteria);
    }

    override getColumns(): AppListColumnDefinition<WalletSearchItem>[] {
        return [
            { name: 'name', label: 'budget.name', value: x => x.name, sortable: false },
            { name: 'currency', label: 'budget.currency', value: x => x.currency, sortable: false },
        ];
    }

    override getDefaultFilters () {
        return {
            name: '',
            currency: ''
        };
    }

    showEditDialog() {
        this.appDialogService.open('WalletEditDialog', {})
    }
}
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WalletSearchItem, WalletService } from '../../services/wallets.service';
import { AppText } from '../../../../core/controls/app-text.component';
import { AppCurrencySelect } from '../../../../core/controls/app-currency-select.component';
import { DialogService } from 'primeng/dynamicdialog';
import { WalletEditDialog } from '../../dialogs/wallet-edit.component';
import { AppDialogService } from '../../../../core/services/app-dialog.service';
import { AppPage } from "../../../../core/components/app-page/app-page.component";
import { AppButtonComponent } from '../../../../core/components/app-button/app-button.component';
import { AppFilterPanel } from '../../../../core/components/app-filter-panel/app-filter-panel.component';
import { AppList, AppListColumnDefinition } from '../../../../core/components/app-list/app-list.component';
import { AppSearchPageBase } from '../../../../core/components/app-page-search/app-page-search.component';

@Component({
    selector: 'wallets-page',
    templateUrl: 'wallets.component.html',
    standalone: true,
    imports: [TranslateModule, WalletEditDialog, AppPage, AppButtonComponent, AppFilterPanel, AppCurrencySelect, AppText, AppList],
    providers: [DialogService]
})

export class WalletsPage extends AppSearchPageBase<WalletSearchItem> {
    constructor(
        private walletService: WalletService, 
        private appDialogService: AppDialogService) {
        super()
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
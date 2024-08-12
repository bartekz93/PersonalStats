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
import { WalletColumn } from '@budget/components/wallet-column/wallet-column.component';
import { AppListEditColumn } from '@core/components/app-list/app-list-edit-column.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { AppConfirmService } from '@core/services/app-confirm.service';
import { AppMessageService } from '@core/services/app-message.service';

@Component({
    selector: 'wallets-page',
    templateUrl: 'wallets.component.html',
    standalone: true,
    imports: [TranslateModule, WalletEditDialog, AppPage, AppButtonComponent, AppFilterPanel, AppCurrencySelect, AppText, AppList, AppError, CommonModule, WalletColumn, AppTemplateDirective, AppListEditColumn],
    providers: []
})

export class WalletsPage extends AppSearchPageBase<WalletSearchItem> {
    deletingId = 0;
    
    constructor(
        private walletService: WalletService, 
        private appConfirmService: AppConfirmService,
        private appMessageService: AppMessageService,
        private appDialogService: AppDialogService) {
        super('WalletsList')
    }

    override getResult(criteria: any) {
        return this.walletService.search(criteria);
    }

    override getColumns(): AppListColumnDefinition<WalletSearchItem>[] {
        return [
            { name: 'name', label: 'budget.name', component: WalletColumn },
            { name: 'currency', label: 'budget.currency', value: x => x.currency },
            { name: 'actions', label: '', width: '100px' },
            
        ];
    }

    override getDefaultFilters () {
        return {
            name: '',
            currency: ''
        };
    }

    showEditDialog(item?: WalletSearchItem) {
        this.appDialogService.open('WalletEditDialog', item)
    }

    async showDeleteDialog(item: WalletSearchItem) {
        await this.appConfirmService.show('budget.msg.walletDeleteConfirmation', { name: item.name });

        try {
            this.deletingId = item.id;
            await this.walletService.remove(item.id);
            this.appMessageService.success('budget.msg.walletDeleteSuccess', { name: item.name })
            this.search();
        }
        catch (err) {
            this.appMessageService.handleError(err)
        }
        finally {
            this.deletingId = 0;
        }
    }
}
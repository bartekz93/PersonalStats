import { Component }                              from '@angular/core';
import { TranslateModule }                        from '@ngx-translate/core';
import { AppPage }                                from "@core/components/app-page/app-page.component";
import { AppButtonComponent }                     from '@core/components/app-button/app-button.component';
import { AppFilterPanel }                         from '@core/components/app-filter-panel/app-filter-panel.component';
import { AppList, AppListColumnDefinition }       from '@core/components/app-list/app-list.component';
import { AppSearchPageBase }                      from '@core/base/app-search-page.base';
import { AppText }                                from '@core/controls/app-text.component';
import { AppDialogService }                       from '@core/services/app-dialog.service';
import { AppError } from '@core/components/app-error/app-error.component';
import { CommonModule } from '@angular/common';
import { AppListEditColumn } from '@core/components/app-list/app-list-edit-column.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { AppConfirmService } from '@core/services/app-confirm.service';
import { AppMessageService } from '@core/services/app-message.service';
import budgetModule from '@budget/budget.module';
import { TransactionSearchItem, TransactionService } from '@budget/services/transactions.service';
import { Format } from '@core/helpers/formatters';
import { AppDate } from '@core/controls/app-date.component';
import { AppNumber } from '@core/controls/app-number.component';
import { WalletMultiSelectComponent } from '@budget/controls/wallet-multi-select.component';
import { CategoryMultiSelectComponent } from '@budget/controls/category-multi-select.component';
import { AppCircleLabelComponent } from '@core/components/app-circle-label/app-circle-label.component';
import { AmountBarColumn } from '@budget/components/amount-bar-column/amount-bar-column.component';

@Component({
    selector: 'transactions-page',
    templateUrl: 'transactions.component.html',
    standalone: true,
    imports: [TranslateModule, AppPage, AppButtonComponent, CategoryMultiSelectComponent, AppCircleLabelComponent, WalletMultiSelectComponent, AppFilterPanel, AppNumber, AppText, AppDate, AppList, AppError, CommonModule, AppTemplateDirective, AppListEditColumn],
    providers: []
})

export class TransactionsPage extends AppSearchPageBase<TransactionSearchItem> {
    deletingId = 0;
    
    constructor(
        private transactionService: TransactionService, 
        private appConfirmService: AppConfirmService,
        private appMessageService: AppMessageService,
        private appDialogService: AppDialogService) {
        super(budgetModule.lists.TransactionsList)
    }

    override getResult(criteria: any) {
        return this.transactionService.search(criteria).then(x => {
            let maxValue = Math.max(...x.rows.map(x => Math.abs(x.amount)));
            x.rows.forEach(y => y.relWidth = `${Math.abs(y.amount) / maxValue * 100}%`);
            return x;
        });
    }

    override getColumns(): AppListColumnDefinition<TransactionSearchItem>[] {
        return [
            { name: 'date', label: 'budget.date', value: x => Format.date(x.date) },
            { name: 'walletName', label: 'budget.wallet' },
            { name: 'categoryName', label: 'budget.category' },
            { name: 'description', label: 'budget.description', value: x => x.description },
            { name: 'amount', label: 'budget.amount', value: x => `${Format.decimal(x.amount, 2)} ${x.walletCurrency}` },
            { name: 'bar', label: '', width: '300px', component: AmountBarColumn },
            { name: 'actions', label: '', width: '100px' },
        ];
    }

    override getDefaultFilters () {
        return {
            dateFrom: '',
            dateTo: '',
            amountMin: null,
            amountMax: null,
            categoryIds: '',
            walletIds: '',
            description: ''
        };
    }

    showEditDialog(item?: TransactionSearchItem) {
        this.appDialogService.open(budgetModule.dialogs.TransactionEditDialog, item)
    }

    async showDeleteDialog(item: TransactionSearchItem) {
        await this.appConfirmService.show('budget.msg.transactionDeleteConfirmation', { 
            amount: Format.decimal(item.amount, 2), 
            currency: item.walletCurrency 
        });

        try {
            this.deletingId = item.id;
            await this.transactionService.remove(item.id);
            this.appMessageService.success('budget.msg.transactionDeleteSuccess')
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
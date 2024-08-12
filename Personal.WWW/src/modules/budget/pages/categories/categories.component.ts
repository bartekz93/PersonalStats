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
import { WalletColumn } from '@budget/components/wallet-column/wallet-column.component';
import { AppListEditColumn } from '@core/components/app-list/app-list-edit-column.component';
import { AppTemplateDirective } from '@core/directives/app-template.directive';
import { AppConfirmService } from '@core/services/app-confirm.service';
import { AppMessageService } from '@core/services/app-message.service';
import { CategorySearchItem, CategoryService } from '@budget/services/category.service';
import budgetModule from '@budget/budget.module';

@Component({
    selector: 'categories-page',
    templateUrl: 'categories.component.html',
    standalone: true,
    imports: [TranslateModule, AppPage, AppButtonComponent, AppFilterPanel, AppText, AppList, AppError, CommonModule, WalletColumn, AppTemplateDirective, AppListEditColumn],
    providers: []
})

export class CategoriesPage extends AppSearchPageBase<CategorySearchItem> {
    deletingId = 0;
    
    constructor(
        private categoryService: CategoryService, 
        private appConfirmService: AppConfirmService,
        private appMessageService: AppMessageService,
        private appDialogService: AppDialogService) {
        super(budgetModule.lists.CategoriesList)
    }

    override getResult(criteria: any) {
        return this.categoryService.search(criteria);
    }

    override getColumns(): AppListColumnDefinition<CategorySearchItem>[] {
        return [
            { name: 'type', label: 'budget.type', value: x => x.type },
            { name: 'name', label: 'budget.name' },
            { name: 'actions', label: '', width: '100px' },
            
        ];
    }

    override getDefaultFilters () {
        return {
            name: '',
            type: ''
        };
    }

    showEditDialog(item?: CategorySearchItem) {
        this.appDialogService.open(budgetModule.dialogs.CategoryEditDialog, item)
    }

    async showDeleteDialog(item: CategorySearchItem) {
        await this.appConfirmService.show('budget.msg.categoryDeleteConfirmation', { name: item.name });

        try {
            this.deletingId = item.id;
            await this.categoryService.remove(item.id);
            this.appMessageService.success('budget.msg.categoryDeleteSuccess', { name: item.name })
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
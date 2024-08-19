import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import budgetModule from '@budget/budget.module';
import { CategorySelectComponent } from '@budget/controls/category-select.component';
import { WalletSelectComponent } from '@budget/controls/wallet-select.component';
import { TransactionEdit, TransactionService } from '@budget/services/transactions.service';
import { EditDialogBase } from '@core/base/app-edit-dialog.base';
import { AppDialogComponent } from '@core/components/app-dialog/app-dialog.component';
import { AppFormComponent } from '@core/components/app-form/app-form.component';
import { AppDate } from '@core/controls/app-date.component';
import { AppDialogService } from '@core/services/app-dialog.service';
import { AppMessageService } from '@core/services/app-message.service';
import { AppNumber } from "../../../../core/controls/app-number.component";
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppTextarea } from '@core/controls/app-textarea.component';

@Component({
    standalone: true,
    imports: [AppDialogComponent, AppFormComponent, WalletSelectComponent, CategorySelectComponent, AppDate, AppNumber, AppButtonComponent, AppTextarea],
    selector: 'transaction-edit-dialog',
    templateUrl: 'transaction-edit.component.html'
})

export class TransactionEditDialog extends EditDialogBase<TransactionEdit> {

    constructor(appDialogService: AppDialogService, appMessageService: AppMessageService, private transactionService: TransactionService) { 
        super(budgetModule.dialogs.TransactionEditDialog, appDialogService, appMessageService);
    }
    
    @Output() onSave = new EventEmitter();

    override getDefaultValues() {
        return {
            id: 0,
            date: new Date().toISOString().substring(0, 10),
            walletId: null,
            categoryId: null,
            description: '',
            amount: null
        }
    }
    override getFormGroup(): FormGroup<any> {
        return new FormGroup({
            id: new FormControl('', []),
            date: new FormControl('', [Validators.required]),
            walletId: new FormControl('', [Validators.required]),
            categoryId: new FormControl('', [Validators.required]),
            description: new FormControl('', []),
            amount: new FormControl('', [Validators.required]),
        })
    }
    override async onEdit(edit: TransactionEdit): Promise<any> {
        await this.transactionService.edit(edit);
        this.appMessageService.success('budget.msg.transactionEditSuccess')
        this.onSave.emit();
    }
    override async onCreate(edit: TransactionEdit): Promise<any> {
        await this.transactionService.create(edit);
        this.appMessageService.success('budget.msg.transactionCreateSuccess')
        this.onSave.emit();
    }
}
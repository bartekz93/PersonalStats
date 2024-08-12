import { Component, EventEmitter, Output } from '@angular/core';
import { AppDialogComponent } from '@core/components/app-dialog/app-dialog.component';
import { AppText } from '@core/controls/app-text.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppCurrencySelect } from '@core/controls/app-currency-select.component';
import { CommonModule } from '@angular/common';
import { AppColorSelect } from '@core/controls/app-color-select.component';
import { AppDialogService } from '@core/services/app-dialog.service';
import { WalletEdit, WalletService } from '@budget/services/wallets.service';
import { AppMessageService } from '@core/services/app-message.service';
import { AppFormComponent } from '@core/components/app-form/app-form.component';
import { AppError } from '@core/components/app-error/app-error.component';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import budgetModule from '@budget/budget.module';
import { EditDialogBase } from '@core/base/app-edit-dialog.base';

@Component({
    standalone: true,
    imports: [AppDialogComponent, CommonModule, AppFormComponent, AppColorSelect, AppCurrencySelect, AppText, AppError, AppButtonComponent],
    selector: 'wallet-dialog',
    templateUrl: `wallet-edit.component.html`,
})

export class WalletEditDialog extends EditDialogBase<WalletEdit> {

    constructor(appDialogService: AppDialogService, appMessageService: AppMessageService, private walletService: WalletService) { 
        super(budgetModule.dialogs.WalletEditDialog, appDialogService, appMessageService);
    }

    @Output() onSave = new EventEmitter();

    override getFormGroup(): FormGroup<any> {
        return new FormGroup({
            id: new FormControl('', []),
            color: new FormControl('', []),
            name: new FormControl('', [Validators.required]),
            currency: new FormControl('', [Validators.required]),
        })
    }

    override getDefaultValues() {
        return {
            id: 0,
            color: '#ff0000',
            name: '',
            currency: ''
        }
    }

    override async onEdit(edit: WalletEdit) {
        await this.walletService.edit(edit);
        this.appMessageService.success('budget.msg.walletEditSuccess')
        this.onSave.emit();
    }

    override async onCreate(edit: WalletEdit) {
        await this.walletService.create(edit);
        this.appMessageService.success('budget.msg.walletCreateSuccess')
        this.onSave.emit();
    }
}
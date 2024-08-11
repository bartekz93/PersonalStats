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

@Component({
    standalone: true,
    imports: [AppDialogComponent, CommonModule, AppFormComponent, AppColorSelect, AppCurrencySelect, AppText, AppError, AppButtonComponent],
    selector: 'wallet-dialog',
    templateUrl: `wallet-edit.component.html`,
})

export class WalletEditDialog {
    constructor(private appDialogService: AppDialogService, private walletService: WalletService, private messageService: AppMessageService) { 
        this.formGroup = new FormGroup({
            color: new FormControl('', []),
            name: new FormControl('', [Validators.required]),
            currency: new FormControl('', [Validators.required]),
        })
    }

    @Output() onSave = new EventEmitter();

    formGroup!: FormGroup;
    isSaving = false;

    control(name: string) {
        return this.formGroup?.get(name) as FormControl;
    }

    getDefaultValues() {
        return {
            color: '#ff0000',
            name: '',
            currency: ''
        }
    }

    open(data: any) {
        this.formGroup.setValue(
            Object.keys(data).length == 0 
                ? this.getDefaultValues() 
                : data
        );
    }

    close() {
        this.appDialogService.close('WalletEditDialog')
    }

    async save(edit: WalletEdit) {
        this.isSaving = true;
        try {
            await this.walletService.create(edit);

            this.messageService.success('budget.msg.walletCreateSuccess')
            this.close();
            this.onSave.emit();
        }
        catch (err) {
            this.messageService.handleError(err)
        }
        finally {
            this.isSaving = false;
        }
    }
}
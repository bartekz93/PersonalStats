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
            id: new FormControl('', []),
            color: new FormControl('', []),
            name: new FormControl('', [Validators.required]),
            currency: new FormControl('', [Validators.required]),
        })
    }

    @Output() onSave = new EventEmitter();

    formGroup!: FormGroup;
    isSaving = false;
    isEdit = false;

    control(name: string) {
        return this.formGroup?.get(name) as FormControl;
    }

    getDefaultValues() {
        return {
            id: 0,
            color: '#ff0000',
            name: '',
            currency: ''
        }
    }

    open(data: any) {
        this.isEdit = !!data;
        this.formGroup.setValue(data || this.getDefaultValues());
    }

    close() {
        this.appDialogService.close('WalletEditDialog')
    }

    async save(edit: WalletEdit) {
        this.isSaving = true;
        try {
            if (this.isEdit) {
                await this.walletService.edit(edit);
                this.messageService.success('budget.msg.walletEditSuccess')
            }
            else {
                await this.walletService.create(edit);
                this.messageService.success('budget.msg.walletCreateSuccess')
            }
            
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
import { Component, EventEmitter, Output } from '@angular/core';
import { AppDialogComponent } from '../../../core/components/app-dialog/app-dialog.component';
import { AppForm } from '../../../core/models/app-form';
import { AppText } from '../../../core/controls/app-text.component';
import { Validators } from '@angular/forms';
import { AppCurrencySelect } from '../../../core/controls/app-currency-select.component';
import { CommonModule } from '@angular/common';
import { AppColorSelect } from '../../../core/controls/app-color-select.component';
import { AppDialogService } from '../../../core/services/app-dialog.service';
import { AppActionContext } from '../../../core/models/app-page-action.model';
import { WalletEdit, WalletService } from '../services/wallets.service';
import { AppMessageService } from '../../../core/services/app-message.service';

@Component({
    standalone: true,
    imports: [AppDialogComponent, CommonModule],
    selector: 'wallet-dialog',
    template: `<app-dialog 
        code="WalletEditDialog" 
        title="budget.addWallet" 
        (open)="open($event)" 
        [form]="form" />`,
})

export class WalletEditDialog {
    constructor(private appDialogService: AppDialogService, private walletService: WalletService, private messageService: AppMessageService) { }

    @Output() onSave = new EventEmitter();

    form?: AppForm;

    open(data: any) {
        this.form = {
            controls: [{
                field: 'color',
                value: '#ff0000',
                label: '',
                component: AppColorSelect,
            },{
                field: 'name',
                value: '',
                label: 'budget.name',
                component: AppText,
                rules: [Validators.required],
            }, {
                field: 'currency',
                value: '',
                label: 'budget.currency',
                component: AppCurrencySelect,
                rules: [Validators.required],
            }],
            actions: [{
                label: 'app.cancel',
                onClick: () => this.appDialogService.close('WalletEditDialog')
            },{
                label: 'app.save',
                submit: true,
                primary: true,
                onClick: (x, y) => this.save(x, y)
            }]
        }
    }

    async save(actionCtx: AppActionContext, edit: WalletEdit) {
        actionCtx.inProgress(true);
        try {
            await this.walletService.create(edit);

            this.messageService.success('budget.msg.walletCreateSuccess')
            this.appDialogService.close('WalletEditDialog')
            this.onSave.emit();
        }
        catch (err) {
            this.messageService.handleError(err)
        }
        finally {
            actionCtx.inProgress(false);
        }
    }
}
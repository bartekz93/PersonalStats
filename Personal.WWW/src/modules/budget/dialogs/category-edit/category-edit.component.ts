import { Component, EventEmitter, Output } from '@angular/core';
import { AppDialogComponent } from '@core/components/app-dialog/app-dialog.component';
import { AppText } from '@core/controls/app-text.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppCurrencySelect } from '@core/controls/app-currency-select.component';
import { CommonModule } from '@angular/common';
import { AppColorSelect } from '@core/controls/app-color-select.component';
import { AppDialogService } from '@core/services/app-dialog.service';
import { AppMessageService } from '@core/services/app-message.service';
import { AppFormComponent } from '@core/components/app-form/app-form.component';
import { AppError } from '@core/components/app-error/app-error.component';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import budgetModule from '@budget/budget.module';
import { EditDialogBase } from '@core/base/app-edit-dialog.base';
import { CategoryEdit, CategoryService } from '@budget/services/category.service';
import { AppIconSelect } from '@core/controls/app-icon-select.component';
import { AppCircleLabelComponent } from "../../../../core/components/app-circle-label/app-circle-label.component";
import { CategoryTypeSelectComponent } from '@budget/controls/category-type-select.component';

@Component({
    standalone: true,
    imports: [AppDialogComponent, CommonModule, AppFormComponent, AppColorSelect, AppCurrencySelect, AppText, AppError, AppButtonComponent, AppIconSelect, AppCircleLabelComponent, AppCircleLabelComponent, CategoryTypeSelectComponent],
    selector: 'category-dialog',
    templateUrl: `category-edit.component.html`,
})

export class CategoryEditDialog extends EditDialogBase<CategoryEdit> {

    constructor(appDialogService: AppDialogService, appMessageService: AppMessageService, private categoryService: CategoryService) { 
        super(budgetModule.dialogs.CategoryEditDialog, appDialogService, appMessageService);
    }

    @Output() onSave = new EventEmitter();

    override getFormGroup(): FormGroup<any> {
        return new FormGroup({
            id: new FormControl('', []),
            type: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            color: new FormControl('', [Validators.required]),
            icon: new FormControl('', [Validators.required])
        })
    }

    override getDefaultValues() {
        return {
            id: 0,
            color: '#ff0000',
            icon: 'pi pi-sun',
            name: '',
            type: ''
        }
    }

    override async onEdit(edit: CategoryEdit) {
        await this.categoryService.edit(edit);
        this.appMessageService.success('budget.msg.categoryEditSuccess')
        this.onSave.emit();
    }

    override async onCreate(edit: CategoryEdit) {
        await this.categoryService.create(edit);
        this.appMessageService.success('budget.msg.categoryCreateSuccess')
        this.onSave.emit();
    }
}
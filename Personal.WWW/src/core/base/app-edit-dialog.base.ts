import { FormControl, FormGroup } from "@angular/forms";
import { AppDialogService } from "@core/services/app-dialog.service";
import { AppMessageService } from "@core/services/app-message.service";

export abstract class EditDialogBase<T> {

    protected formGroup!: FormGroup;
    protected isSaving = false;
    protected isEdit = false;
    protected name = '';

    constructor(name: string, private appDialogService: AppDialogService, protected appMessageService: AppMessageService) {
        this.name = name;
        this.formGroup = this.getFormGroup();
    }

    protected control(name: string) {
        return this.formGroup?.get(name) as FormControl;
    }

    open(data: T) {
        this.isEdit = !!data;
        this.formGroup.setValue(data || this.getDefaultValues());

        for (const field in this.formGroup.controls) { 
            this.formGroup.get(field)?.markAsUntouched();
        }
    }

    close() {
        this.appDialogService.close(this.name);
    }

    async save(edit: T) {
        this.isSaving = true;
        try {
            if (this.isEdit) {
                await this.onEdit(edit);
            }
            else {
                await this.onCreate(edit);
            }
            
            this.close();
        }
        catch (err) {
            this.appMessageService.handleError(err)
        }
        finally {
            this.isSaving = false;
        }
    }

    abstract getDefaultValues(): any;
    abstract getFormGroup(): FormGroup;
    abstract onEdit(edit: T): Promise<any>;
    abstract onCreate(edit: T): Promise<any>;

}
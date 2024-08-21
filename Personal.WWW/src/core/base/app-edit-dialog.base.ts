import { FormControl, FormGroup } from "@angular/forms";
import { AppDialogOpenOptions, AppDialogService } from "@core/services/app-dialog.service";
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

    open(event: { data: T, options?: AppDialogOpenOptions }) {
        this.isEdit = event.options?.isEdit != undefined ? event.options.isEdit : !!event.data;
        this.formGroup.setValue(event.data || this.getDefaultValues());

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
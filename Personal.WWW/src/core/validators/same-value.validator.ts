import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function sameValueValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const control2 = control.parent?.get(controlName);

        if (control?.touched && control2?.touched && control?.value != control2?.value) {
            return { sameValue: true };
        }
        return null;
    }
}
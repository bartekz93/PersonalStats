import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }
        
        const validLength = value.length >= 6;

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const hasSpecial = /[!@#$%^&*()_+}{":?><//}]+/.test(value);

        const passwordValid = validLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

        return !passwordValid ? {passwordStrength:true}: null;
    }
}
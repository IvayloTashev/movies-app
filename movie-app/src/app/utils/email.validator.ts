import { ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    const regExp = new RegExp(`[A-Za-z0-9]{3,}@(abv\.bg)`);

    return (control) => {
        const isInvalid = control.value === '' || regExp.test(control.value);

        return isInvalid ? null : { emailValidator: true };
    }
}
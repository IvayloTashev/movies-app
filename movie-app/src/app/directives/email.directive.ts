import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from "@angular/forms";
import { emailValidator } from "../utils/email.validator";

@Directive({
    selector: '[appEmail]',
    standalone: true,
    providers: [{
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: EmailDirective
    }]
})
export class EmailDirective implements Validators {

    validate(control: AbstractControl): ValidationErrors | null {
        const validatorFn = emailValidator();

        return validatorFn(control);
    }
}
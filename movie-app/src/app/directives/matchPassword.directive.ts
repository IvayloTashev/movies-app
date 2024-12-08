import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPasswords]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: MatchPasswordsDirective, multi: true }
  ]
})
export class MatchPasswordsDirective implements Validator {
  @Input('appMatchPasswords') passwordFields!: { password: string; confirmPassword: string };

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.passwordFields) {
      return null;
    }
  
    const passwordControl = control.get(this.passwordFields.password);
    const confirmPasswordControl = control.get(this.passwordFields.confirmPassword);
  
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }
  
    const passwordsMatch = passwordControl.value === confirmPasswordControl.value;
    return passwordsMatch ? null : { passwordsMismatch: true };
  }
}
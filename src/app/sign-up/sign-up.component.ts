import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpFormControl: FormGroup;
  // private subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpFormControl = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confPassword: ['', [Validators.required]],
    },
      {validator: this.passwordMatchValidator}
    );
    // this.subscription.add(this.signUpFormControl.valueChanges.subscribe(val => console.log(val)));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  submitForm(): void {
    alert(`${this.signUpFormControl.value.firstName}  ${this.signUpFormControl.value.lastName} ${this.signUpFormControl.value.email} ${this.signUpFormControl.value.password} ${this.signUpFormControl.value.confPassword} `);
  }
  passwordMatchValidator(frm: FormGroup): any{
    if (frm.controls.password.value ===
      frm.controls.confPassword.value) {
        frm.controls.password.setErrors(null);
        frm.controls.confPassword.setErrors(null);
        return null;
    } else {
      frm.controls.password.setErrors({error: 'Passwords don\'t match'});
      frm.controls.confPassword.setErrors({error: 'Passwords don\'t match'});
      return {mismatch: true};
    }
  }
}

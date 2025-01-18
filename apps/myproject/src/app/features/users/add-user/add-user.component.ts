import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent, InputComponent } from '@component-library/components';
import { AddUserForm } from '../models/add-user-form';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  form: FormGroup<AddUserForm>;
  fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      name: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      surname: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      username: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      country: this.fb.control<string | null>(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('User Data:', this.form.value);
    }
  }
}

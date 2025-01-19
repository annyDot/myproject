import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  ModalEvent,
} from '@component-library/components';
import { AddUserForm } from '../../models/add-user-form';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements OnInit {
  form: FormGroup<AddUserForm>;
  fb = inject(FormBuilder);
  exampleInput = input('');
  modalOutput = output<ModalEvent>();

  ngOnInit(): void {
    console.log(this.exampleInput);
  }

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

  onSubmit() {
    if (this.form.valid) {
      this.modalOutput.emit({ type: 'save', data: this.form.value });
    }
  }
}

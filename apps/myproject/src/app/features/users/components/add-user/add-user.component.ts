import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  Modal,
  ModalButton,
  ModalEvent,
} from '@component-library/components';
import { AddUserForm } from '../../models/add-user-form';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements Modal {
  @Input() buttons: ModalButton[] = [];
  modalOutput = output<ModalEvent['data']>();

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

  onBtnClick(type: ModalEvent['type']) {
    if (this.form.valid && type === 'save') {
      this.modalOutput.emit({ type, data: this.form.value });
    } else {
      this.modalOutput.emit({ type });
    }
  }
}
